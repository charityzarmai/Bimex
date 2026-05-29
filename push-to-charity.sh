#!/bin/bash

# Push onboarding tour feature to charity's repo
echo "🚀 Pushing feature/onboarding-tour to charity's repository..."

git push charity feature/onboarding-tour

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to charity/Bimex"
    echo ""
    echo "📝 Next steps:"
    echo "1. Go to: https://github.com/charityzarmai/Bimex"
    echo "2. Click 'Compare & pull request'"
    echo "3. Review the changes and create the PR"
    echo ""
    echo "Or use GitHub CLI:"
    echo "gh pr create --repo charityzarmai/Bimex --base main --head feature/onboarding-tour"
else
    echo "❌ Push failed. Please check your git configuration and try again."
    echo ""
    echo "You can manually push with:"
    echo "git push charity feature/onboarding-tour"
fi
