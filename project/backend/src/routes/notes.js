import express from 'express'
import { prisma } from "../prismaClient.js";

export const notesRouter = express.Router()

// get all public notes
notesRouter.get('/', async (req, res) => {
  try {
    const notes = await prisma.note.findMany({
      orderBy: { id: 'asc' },
    })
    res.json(notes)
  } catch (error) {
    console.error('Error fetching notes:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

//create a new note
notesRouter.post('/', async (req, res) => {
  const { title, content, authorName, isPublic } = req.body

  if (!title || !content || !authorName) {
    return res.status(400).json({ error: 'Title, content, and author name are required' })
  }

  try {
    const newNote = await prisma.note.create({
      data: {
        title,
        content,
        authorName,
        isPublic: isPublic ?? false,
      },
    })
    res.status(201).json(newNote)
  } catch (error) {
    console.error('Error creating note:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// update an existing note
notesRouter.put('/:id', async (req, res) => {
  const { id } = req.params
  const { title, content, authorName, isPublic } = req.body

  if (!title || !content || !authorName) {
    return res.status(400).json({ error: 'Title, content, and author name are required' })
  }

  try {
    const updatedNote = await prisma.note.update({
      where: { id: parseInt(id) },
      data: {
        title,
        content,
        authorName,
        isPublic: isPublic ?? false,
      },
    })
    res.json(updatedNote)
  } catch (error) {
    console.error('Error updating note:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// delete a note
notesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    await prisma.note.delete({
      where: { id: parseInt(id) },
    })
    res.status(200).json({message: 'Note deleted successfully'})
  } catch (error) {
    console.error('Error deleting note:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// get a single note by id
notesRouter.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const note = await prisma.note.findUnique({
      where: { id: parseInt(id) },
    })

    if (!note) {
      return res.status(404).json({ error: 'Note not found' })
    }

    res.json(note)
  } catch (error) {
    console.error('Error fetching note:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

