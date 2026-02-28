# Ready Set Vote 🗳️

A voter research and ballot preparation tool that helps you make informed decisions on election day.

## Features

- 📍 **Find Your Ballot** - Enter your address to see your exact ballot
- 🗳️ **All Races** - View all federal, state, and local races
- ✅ **Make Selections** - Check your preferred candidates
- 🔍 **Research Candidates** - Quick links to candidate info, voting records, and campaign finance
- 📍 **Polling Location** - See where and when to vote
- 📄 **Print Your Ballot** - Generate a printable guide to take to the polls

## How It Works

1. Enter your full street address
2. View all races and candidates on your ballot
3. Research candidates using the built-in search tools
4. Check the box next to your preferred candidates
5. Print your selections to bring to the polls

## Technology

- **Google Civic Information API** - Provides ballot data, polling locations, and candidate information
- **Cloudflare Workers** - Secure API proxy to protect API keys
- **Tailwind CSS** - Clean, responsive design
- **Client-side** - Your address is never stored

## Privacy

Your address is only used to look up your ballot through the Google Civic Information API. It is never stored or saved anywhere.

## Setup

### Option 1: Use Live Demo
Visit: `https://samiprehn.github.io/ready-set-vote`

### Option 2: Run Locally
1. Clone this repository
2. Open `index.html` in your browser
3. That's it! No build process needed.

### API Setup
The app uses a Cloudflare Worker to securely proxy Google Civic Information API requests. The API key is stored as an environment variable in Cloudflare Workers, keeping it secure and never exposed in the frontend code.

## Features Implemented

- ✅ Ballotpedia integration (Google search links)
- ✅ Wikipedia links (Google search links)
- ✅ Campaign finance data (OpenSecrets search links)
- ✅ Candidate voting records (Google search links)
- ✅ Issues/Positions research (Google search links)
- ✅ Social media links (when available from API)
- ✅ Party-based color coding (blue for Democrats, red for Republicans)
- ✅ Multi-winner race support
- ✅ Ultra-compact print layout

## Future Enhancements

- [ ] Ballot measure explanations
- [ ] Save/share functionality
- [ ] Voter registration status check
- [ ] Early voting locations

## Contributing

This is a personal project, but feel free to fork it and make your own version!

## License

MIT License - Feel free to use this however you want!

---

Made with ❤️ to help voters make informed decisions.
