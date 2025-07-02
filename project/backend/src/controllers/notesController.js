import express from "express";
import { prisma } from "../prismaClient.js";
import { createError } from "../utils/errorHandler.js";
import { handlePrismaError } from "../utils/prismaErrorHandler.js";

export const notesRouter = express.Router();

export const getAllNotes = async (req, res, next) => {
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
            return next(createError(404, "No notes found"));
        }

        return res.json(notes);
        }

        const notes = await prisma.note.findMany({
            orderBy: { id: 'asc' },
        });

        if (notes.length === 0) {
            return next(createError(404, "No notes found"));
        }

        return res.json(notes);
    } catch (error) {
        console.error("Error fetching note:", error);
        next(internalServerError("Failed to fetch note"));
    }
}

export const createNote = async (req, res, next) => {
    const { title, content, authorName, isPublic } = req.body;

    if (!title || !content || !authorName) {
        return next(createError(400, "Title, content, and author name are required"));
    }

    try {
        const newNote = await prisma.note.create({
            data: {
                title,
                content,
                authorName,
                isPublic: isPublic ?? true,
            },
        });
        res.status(201).json(newNote);
    } catch (error) {
        console.error("Error creating note:", error);
        next(internalServerError("Failed to create note"));
    }
}

export const updateNote = async (req, res, next) => {
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

export const deleteNote = async (req, res, next) => {
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

export const getNoteById = async (req, res, next) => {
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
        next(internalServerError("Failed to fetch note"));
    }
}