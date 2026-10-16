# Qubetics Validator App

Frontend for validator onboarding and validator account management on Qubetics.

## Branches

- `prod` is for mainnet.
- `testnet` is for testnet.

## Local setup

1. Install dependencies with `npm install --force` (the repository currently has no committed lock file).
2. Copy `.env.example` to `.env` and replace each placeholder with the correct network configuration. These `REACT_APP_*` values are included in the browser bundle; do not put secrets in them.
3. Run `npm start` for development or `npm run build` for a production build.
4. Run `npm test -- --watchAll=false` for tests. The repository currently has no test files.

The Dockerfile currently builds with Node 16 and runs `npm i --force`; Node 16 is end-of-life, so upgrade it only after checking dependency compatibility.
