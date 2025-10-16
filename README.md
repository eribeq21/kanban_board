# Kanban Board

A clean kanban board for managing tasks. Built with SvelteKit for simplicity and performance.

## Description

This is a task management app that uses the classic kanban workflow - Do, Doing, Done, Archive. Tasks can be dragged and dropped between columns for quick status updates.

The board features a vintage sticky-note aesthetic with slight card rotations and random pastel colors to create a more organic feel.

The app detects the user's location and fetches a background image from Unsplash based on their country. This adds a personalized touch to the interface. The app works offline by caching location data and runs as a PWA.

## Features

- **Drag & Drop** - Move tasks between columns with your mouse
- **Persistent Storage** - Everything saves to localStorage automatically
- **Due Dates** - Set deadlines and get visual warnings when tasks are overdue
- **Export Options** - Download tasks as CSV or export individual tasks as calendar events (.ics)
- **Share Tasks** - Use the native share API to send task details
- **Offline Support** - Works offline with service worker caching
- **Location-Based Backgrounds** - Dynamic backgrounds based on your location via Unsplash
- **PWA Ready** - Install it as a standalone app on desktop or mobile

## Setup


That's it. The app uses localStorage for data persistence, so no backend setup needed.

