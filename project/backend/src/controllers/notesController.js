import express from "express";
import { prisma } from "../prismaClient.js";
import { createError } from "../utils/errorHandler.js";
import { handlePrismaError } from "../utils/prismaErrorHandler.js";

export const notesRouter = express.Router();

export const getAllNotes = async (req, res) => {
    const { authorName } = req.query;
    try {
        if(authorName) {
            const notes = await prisma.note.findMany({
            where: { 
                authorName: {
                    contains: authorName,
                    mode: "insensitive"
                } 
            },
            orderBy: { id: 'asc' },
        });

        if (notes.length === 0) {
            return res.status(404).json({ error: "No notes found for this author" });
        }

        return res.json(notes);
        }

        const notes = await prisma.note.findMany({
            orderBy: { id: 'asc' },
        });
        return res.json(notes);
    } catch (error) {
        console.error("Error fetching note:", error);
        next(internalServerError("Failed to fetch note"));
    }
}

export const createNote = async (req, res) => {
    const { title, content, authorName, isPublic } = req.body;

    if (!title || !content || !authorName) {
        return res.status(400).json({ error: "Title, content, and author name are required" });
    }

    try {
        const newNote = await prisma.note.create({
            data: {
                title,
                content,
                authorName,
                isPublic: isPublic ?? false,
            },
        });
        res.status(201).json(newNote);
    } catch (error) {
        console.error("Error creating note:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content, authorName, isPublic } = req.body;

    if (Object.keys(req.body).length === 0) {
        return next(unprocessable("At least one field must be provided to update the note"));
    }

    try {
        const updatedNote = await prisma.note.update({
            where: { id: parseInt(id) },
            data: {
                title,
                content,
                authorName,
                isPublic,
            },
        });
        res.json(updatedNote);
    } catch (error) {
        handlePrismaError(error, next, "Failed to update note");
    }
}

export const deleteNote = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.note.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        handlePrismaError(error, next, "Failed to delete note");
    }
}

export const getNoteById = async (req, res) => {
    const { id } = req.params;

    try {
        const note = await prisma.note.findUnique({
            where: { id: parseInt(id) },
        });

        if (!note) {
            return next(createError(404, "Note not found"));
        }

        res.json(note);
    } catch (error) {
        console.error("Error fetching note:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}