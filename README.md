# DLicious Recipe Storage

DLicious is a recipe database and manager that allows you to store and edit your favorite recipes. Sort by cuisine, search by name or ingredient, save your favorites, and more.

## About

The original DLicious was built as a final group project for the 2023 CommandShift cohort. Although it was functional, I decided to rebuild it from scratch to ensure I had a better understanding of the codebase. I've always been unhappy with most recipe applications - it was a no-brainer to build my own.

### Installation

1. Clone the repository.

```
git clone https://github.com/Korjubzot/pomodoro-timer.git
```

2. Install dependencies

```
npm install
```

3. Create a dotenv file with the following template.

```
REACT_APP_SUPABASE_URL=YOUR_URL_HERE
REACT_APP_SUPABASE_API_KEY=YOUR_KEY_HERE
```

4. Replace the placeholders with the URL and key generated upon creating a [Supabase project](https://supabase.com/).

5. Start the app.

```
npm start
```

### Usage

Currently, entering and deleting recipes is fully functional and fairly self-explanatory. Users will need to create an account to log in and use the app.

### Roadmap

- [ ] Dark mode
- [ ] Polish language mode
- [ ] Editing and updating recipes
- [ ] Port to AWS/Google Cloud
- [ ] Significant expansions to testing suite
- [ ] Frontend design improvements

#### Built with

- ReactJS
- Supabase
- MUI components
