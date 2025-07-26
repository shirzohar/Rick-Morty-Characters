# Rick & Morty React App

A modern React + TypeScript app to explore Rick & Morty characters and episodes, with favorites, search, filters, dark/light mode, and more.

---

## 1. How to Run the Application

1. Clone the repo
2. `cd my-app`
3. `npm install`
4. `npm start`

The app will run at [http://localhost:3000](http://localhost:3000)

---

## 2. Breakdown of Components

- **App.tsx** – Main app shell, routing, layout, dark mode, and context providers.
- **CharacterList** – Fetches and displays a paginated list of characters (with search/filter).
- **CharacterCard** – Displays a single character (name, image, favorite button).
- **CharacterModal** – Modal with full character details (name, status, species, gender, episodes, origin details).
- **SearchBar** – Search input with history dropdown.
- **FavoritesListDrawer** – Drawer showing favorite characters, with remove and background toggle.
- **EpisodesPage** – Paginated list of episodes.
- **AboutPage** – Info about the app and the series.

---

## 3. Services

### API Service
- **characterService.ts** – Fetches characters (with pagination, search, filter).
- **episodeService.ts** – Fetches episodes (with pagination).

### State Management
- **FavoritesContext.tsx** – Manages favorite characters (add/remove, persist in localStorage).
- **App.tsx** – Manages search, search history, dark mode, and species filter (local state).

---

## 4. Interaction Flow Diagram

### Component Render
```mermaid
graph TD;
  App --> SearchBar
  App --> FavoritesListDrawer
  App --> CharacterList
  CharacterList --> CharacterCard
  CharacterCard --> CharacterModal
  App --> EpisodesPage
  App --> AboutPage
```

### Search
```mermaid
sequenceDiagram
  participant U as User
  participant S as SearchBar
  participant A as App
  participant CL as CharacterList
  participant CC as CharacterCard
  U->>S: Type in search
  S->>A: onChange
  A->>CL: update search prop
  CL->>CL: fetch filtered characters
  CL->>CC: render cards
```

### Modal Interaction
```mermaid
sequenceDiagram
  participant U as User
  participant CC as CharacterCard
  participant CM as CharacterModal
  U->>CC: Click card
  CC->>CM: Open modal
  CM->>CM: Fetch origin details (if needed)
  CM->>U: Show full info
```

### Favorites Management
```mermaid
sequenceDiagram
  participant U as User
  participant CC as CharacterCard
  participant FC as FavoritesContext
  participant FLD as FavoritesListDrawer
  U->>CC: Click star
  CC->>FC: addFavorite/removeFavorite
  FC->>FLD: update favorites
  FC->>FC: persist in localStorage
```

---

## 5. Screenshots

### Home Page
![Home Page](screenshots/Home%20Page.png)
*Main page with character cards, search bar, and species filter*

### Character Card
![Character Card](screenshots/card.png)
*Individual character card with name, image, and favorite button*

### Character Modal
![Who is Rick](screenshots/Who%20is%20Rick.png)
*Detailed character modal with all information including origin details*

### Search Functionality
![Searching](screenshots/Searching.png)
*Search feature with filtered results*

### Favorites Drawer
![Favorites](screenshots/Favorites.png)
*Favorites drawer showing saved characters*

### Episodes Page
![Episodes](screenshots/Episodes.png)
*Episodes page with paginated list*

### About Page
![About Page](screenshots/About%20Page.png)
*About page with information about the app and series*

---

## API
- [Rick and Morty API](https://rickandmortyapi.com/)

