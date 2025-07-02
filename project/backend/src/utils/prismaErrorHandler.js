import { Prisma } from '@prisma/client';
import { createError } from './errorHandler.js';

export function handlePrismaError(error, next, fallbackMessage = "Something went wrong") {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2025':
        return next(createError(404, "Record not found"));
      case 'P2002':
        return next(createError(409, "Unique constraint failed"));
      case 'P2003':
        return next(createError(400, "Foreign key constraint failed"));
      default:
        return next(createError(400, `Database error: ${error.code}`));
    }
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    console.error("Database failed to initialize:", error.message);
    return next(createError(500, "Database initialization failed"));
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    console.error("Unknown Prisma request error:", error.message);
    return next(createError(500, "Unknown database error"));
  }

  // Fallback: not a Prisma error at all
  return next(createError(500, fallbackMessage));
}
