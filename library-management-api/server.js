import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger.json" with { type: "json" };

import User from "./models/User.js";

import booksRoutes from "./routes/booksRoutes.js";
import authorsRoutes from "./routes/authorsRoutes.js";
import membersRoutes from "./routes/membersRoutes.js";
import loansRoutes from "./routes/loansRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// ==========================================
// GENERAL MIDDLEWARE
// ==========================================

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(express.json());

// ==========================================
// PASSPORT
// ==========================================

app.use(passport.initialize());

// ==========================================
// GOOGLE OAUTH
// ==========================================

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const email =
          profile.emails && profile.emails.length > 0
            ? profile.emails[0].value
            : null;

        if (!email) {
          return done(
            new Error("Google account does not provide an email address"),
            null
          );
        }

        // Find existing Google user
        let user = await User.findOne({
          googleId: profile.id
        });

        // If Google user is not found, try finding the user by email
        if (!user) {
          user = await User.findOne({
            email: email
          });
        }

        // Create a new user if necessary
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            email: email,
            name: profile.displayName
          });
        } else if (!user.googleId) {
          // Link Google account to existing user
          user.googleId = profile.id;
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// ==========================================
// ROOT ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Library Management API is running",
    documentation: "/api-docs"
  });
});

// ==========================================
// API ROUTES
// ==========================================

app.use("/books", booksRoutes);
app.use("/authors", authorsRoutes);
app.use("/members", membersRoutes);
app.use("/loans", loansRoutes);
app.use("/auth", authRoutes);

// ==========================================
// SWAGGER API DOCUMENTATION
// ==========================================

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

// ==========================================
// ERROR HANDLER
// ==========================================

app.use((error, req, res, next) => {
  console.error("Server Error:", error);

  res.status(error.status || 500).json({
    message: error.message || "Internal server error"
  });
});

// ==========================================
// EXPORT APP FOR TESTING
// ==========================================

export default app;

// ==========================================
// DATABASE CONNECTION
// ==========================================

async function connectToDatabase() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error(
        "MONGODB_URI is not defined in the environment variables."
      );
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to MongoDB");
    console.log("Database name:", mongoose.connection.name);
    console.log("MongoDB host:", mongoose.connection.host);
  } catch (error) {
    console.error("Database Error:", error.message);
    process.exit(1);
  }
}

// ==========================================
// SERVER
// ==========================================

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectToDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);

      if (process.env.NODE_ENV === "production") {
        console.log("Running in production environment");
      } else {
        console.log(`Local API: http://localhost:${PORT}`);
        console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
      }
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

if (process.env.NODE_ENV !== "test") {
  startServer();
}