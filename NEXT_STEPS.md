# Next Steps - Staging Environment Setup

## ✅ What's Been Completed

All code changes for the staging environment have been implemented and committed locally:

1. ✅ Created `.env.staging` configuration file
2. ✅ Added `build:staging` script to package.json
3. ✅ Created `deploy-staging.sh` deployment script
4. ✅ Added purple STAGING badge to navbar
5. ✅ Wrote comprehensive documentation
6. ✅ Updated README with environment workflow

**Commits**:
- `feat: add staging environment for QA validation`
- `docs: add staging implementation summary`

**Branch**: `feature/pr-documentation`

## 🔐 Authentication Issue

The push to GitHub failed with a 403 error. You need to authenticate:

```bash
# Option 1: Use GitHub CLI
gh auth login

# Option 2: Update remote URL with token
git remote set-url origin https://<YOUR_TOKEN>@github.com/David1984TK/Bimex.git

# Option 3: Use SSH
git remote set-url origin git@github.com:David1984TK/Bimex.git
```

## 📤 Push Changes

After authentication:

```bash
git push origin feature/pr-documentation
```

## 🚀 Manual Setup Required

Once the code is pushed, complete these manual steps:

### 1. Deploy Staging Contract (5 minutes)

```bash
# Generate or use existing staging admin keypair
export STAGING_ADMIN_SECRET=S...

# Deploy the contract
bash scripts/deploy-staging.sh

# Save the output:
# - CONTRACT_ID: CXXXXXXX...
# - ADMIN_ADDRESS: GXXXXXXX...
```

### 2. Update Environment File (1 minute)

Edit `bimex-frontend/.env.staging`:

```env
VITE_CONTRACT_ID=<CONTRACT_ID_from_deploy>
VITE_ADMIN_ADDRESS=<ADMIN_ADDRESS_from_deploy>
```

Commit and push this change.

### 3. Create Vercel Project (10 minutes)

1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import GitHub repository: `David1984TK/Bimex`
4. Configure:
   - **Project name**: `bimex-staging`
   - **Framework Preset**: Vite
   - **Root Directory**: `bimex-frontend`
   - **Build Command**: `npm run build:staging`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Set **Production Branch** to `staging`

6. Add Environment Variables:
   ```
   VITE_NETWORK=testnet
   VITE_CONTRACT_ID=<from_deploy_output>
   VITE_RPC_URL=https://soroban-testnet.stellar.org
   VITE_TOKEN_MXNE=CDDIGHPVTW4PSCQCU67NQ4NXZ4NX5GDLNL3O67WT5RQ4GT6RXIEYPC4P
   VITE_ADMIN_ADDRESS=<from_deploy_output>
   VITE_INDEXER_URL=https://bimex-indexer-staging.vercel.app
   ```

7. Click "Deploy"

### 4. Create Staging Branch (2 minutes)

```bash
# Create staging branch from main
git checkout main
git pull origin main
git checkout -b staging
git push origin staging
```

### 5. Configure Branch Protection (5 minutes)

In GitHub repository settings → Branches:

**For `staging` branch**:
- ✅ Require a pull request before merging
- ✅ Require approvals: 1
- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date before merging

**For `main` branch** (update existing):
- ✅ Require a pull request before merging
- ✅ Require approvals: 2
- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date before merging

### 6. Test the Setup (10 minutes)

```bash
# Create a test feature
git checkout -b feature/test-staging
echo "test" > test.txt
git add test.txt
git commit -m "test: staging workflow"
git push origin feature/test-staging

# Create PR to staging
gh pr create --base staging --title "test: staging workflow"

# After merge, verify:
# 1. Visit https://bimex-staging.vercel.app
# 2. Purple "STAGING" badge should be visible
# 3. Connect wallet and test functionality
# 4. Verify it uses the staging contract (separate data)

# If all good, create PR from staging to main
git checkout staging
git pull origin staging
gh pr create --base main --title "Release: staging environment setup"
```

## 📋 Verification Checklist

After setup, verify:

- [ ] `bimex-staging.vercel.app` is accessible
- [ ] Purple "STAGING" badge appears in navbar
- [ ] Staging uses its own contract (check contract ID in network tab)
- [ ] Can connect wallet and interact with staging contract
- [ ] Data is separate from development environment
- [ ] Workflow: feature → staging → main is documented
- [ ] Branch protection rules are active

## 📚 Documentation

All documentation is ready:

- [Staging Environment Guide](docs/staging-environment.md) - Complete guide
- [Quick Start Guide](docs/STAGING-QUICK-START.md) - Quick reference
- [Implementation Summary](STAGING_IMPLEMENTATION_SUMMARY.md) - What was built
- [README](README.md) - Updated with environment table

## 🎯 Success Criteria

The issue will be fully resolved when:

1. ✅ Code changes are pushed to GitHub
2. ⏳ Staging contract is deployed on testnet
3. ⏳ Vercel project "bimex-staging" is created and deployed
4. ⏳ Staging branch exists and is protected
5. ⏳ Purple STAGING badge is visible on staging URL
6. ⏳ Workflow is tested end-to-end

## ⏱️ Estimated Time

- Authentication & push: 2 minutes
- Contract deployment: 5 minutes
- Vercel setup: 10 minutes
- Branch creation & protection: 7 minutes
- Testing: 10 minutes

**Total**: ~35 minutes

## 🆘 Need Help?

- **Authentication issues**: See [GitHub authentication docs](https://docs.github.com/en/authentication)
- **Vercel setup**: See [Vercel deployment docs](https://vercel.com/docs)
- **Contract deployment**: See `scripts/deploy-staging.sh` comments
- **General questions**: See [docs/staging-environment.md](docs/staging-environment.md)

---

**Current Status**: Code complete, awaiting push and manual setup
**Next Action**: Authenticate and push to GitHub
