#!/bin/bash
# Script to push to charityzarmai GitHub account

echo "Setting up remote for charityzarmai..."

# Add your GitHub as a remote (if not exists)
git remote add charity https://github.com/charityzarmai/Bimex.git 2>/dev/null || echo "Remote 'charity' already exists"

# Or update if it exists
git remote set-url charity https://github.com/charityzarmai/Bimex.git

echo "Pushing to charityzarmai/Bimex..."
git push charity feature/pr-documentation

echo "Done! Branch pushed to https://github.com/charityzarmai/Bimex"
