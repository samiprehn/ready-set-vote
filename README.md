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
- **Tailwind CSS** - Clean, responsive design
- **Client-side only** - No backend needed, your address is never stored

## Privacy

Your address is only used to look up your ballot through the Google Civic Information API. It is never stored or saved anywhere.

## Setup

### Option 1: Use Live Demo
Visit: `https://samiprehn.github.io/ready-set-vote`

### Option 2: Run Locally
1. Clone this repository
2. Open `index.html` in your browser
3. That's it! No build process needed.

### API Key (Optional)
The app uses a shared API key by default. For heavy usage, get your own free Google Civic Information API key:
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a project and enable the Civic Information API
3. Create an API key
4. Replace the `API_KEY` constant in `index.html`

## Future Enhancements

- [ ] Campaign finance data (OpenSecrets API)
- [ ] Ballotpedia integration
- [ ] Wikipedia links
- [ ] Candidate voting records
- [ ] Ballot measure explanations
- [ ] Social media links
- [ ] Save/share functionality
- [ ] Voter registration status check
- [ ] Early voting locations

## Contributing

This is a personal project, but feel free to fork it and make your own version!

## License

MIT License - Feel free to use this however you want!

---

Made with ❤️ to help voters make informed decisions.
