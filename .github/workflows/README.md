# GitHub Workflows

This directory contains GitHub Actions workflows for automating repository maintenance and quality assurance.

## Active Workflows

### 🕰️ Close Inactive Issues (`close-inactive-issues.yml`)

Automatically manages issue lifecycle to maintain repository clarity:

- **Schedule**: Runs daily at 9:00 AM UTC
- **Manual Trigger**: Can be run manually via GitHub Actions UI
- **Stale Threshold**: 30 days of inactivity
- **Closure Threshold**: 7 days after being marked stale
- **Protected Labels**: `pinned`, `security`, `critical`, `help-wanted`, `good-first-issue`

**Process**:
1. Issues inactive for 30 days are labeled as `stale`
2. A notification comment is added explaining the process
3. After 7 more days of inactivity, the issue is automatically closed
4. Any new activity removes the `stale` label and resets the timer

### 🚀 Future Workflows

Additional workflows may be added for:
- Protobuf linting (as mentioned in README.md)
- Automated testing
- Release management
- Security scanning

## Configuration

All workflows use `${{ secrets.GITHUB_TOKEN }}` for authentication, which is automatically provided by GitHub Actions with appropriate repository permissions.