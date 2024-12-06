#!/bin/bash

# Print status message
echo "🚀 Setting up NextJS project..."

# Run npm install
echo "📦 Installing dependencies..."
npm install

# Copy .env.example to .env.local
echo "🔧 Creating .env.local file..."
if [ -f ".env.example" ]; then
    cp .env.example .env.local
    echo "✅ Created .env.local from .env.example"
else
    echo "❌ Error: .env.example file not found"
    exit 1
fi

# Generate AUTH_SECRET
echo "🔑 Generating AUTH_SECRET..."
SECRET=$(npx auth secret)
# Replace or append AUTH_SECRET in .env.local
if grep -q "AUTH_SECRET=" .env.local; then
    sed -i "s/AUTH_SECRET=.*/AUTH_SECRET=$SECRET/" .env.local
else
    echo "AUTH_SECRET=$SECRET" >> .env.local
fi

# Create .prisma directory and dev.db file
echo "💾 Creating Prisma database file..."
touch .prisma/dev.db

echo "✨ Setup complete! Your NextJS project is ready to go."