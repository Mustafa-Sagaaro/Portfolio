// All texts live here, so the story can be updated without touching components.
import meiermueller from './assets/img/meiermueller.webp'
import todo from './assets/img/todo.webp'
import recipes from './assets/img/recipes.webp'

export const profile = {
  first: 'Mustafa',
  last: 'Sagaaro',
  role: 'Basisentwickler',
  company: 'Cistec',
  location: 'Zürich',
  email: 'sagaaromustafa@gmail.com',
  github: 'https://github.com/Mustafa-Sagaaro',
  linkedin: 'https://www.linkedin.com/in/mustafa-sagaaro-26166827a/',
  v1Code: 'https://github.com/Mustafa-Sagaaro/Portfolio/tree/3cef365f84a618cab6485e84eb1f585afb0836c7',
}

export const facts = [
  ['Standort', 'Zürich, Schweiz'],
  ['Rolle', 'Basisentwickler'],
  ['Firma', 'Cistec AG'],
  ['Ausbildung', 'Informatiker EFZ'],
]

export const projects = [
  {
    title: 'MeierMüller',
    kind: 'Responsive Webdesign',
    text: 'Konzept-Website für einen fiktiven Autohändler. Dunkles, edles Design, das auf jedem Bildschirm funktioniert.',
    learned: 'Layout, Typografie und Responsive Design von Grund auf.',
    tags: ['HTML', 'CSS', 'Responsive'],
    image: meiermueller,
    link: 'https://github.com/Mustafa-Sagaaro/ResponsiveWebseiteumsetzen',
  },
  {
    title: 'My Tasks',
    kind: 'To-do Web-App',
    text: 'Aufgaben erstellen, bearbeiten und löschen. Ein Frontend, sauber an ein Backend angebunden.',
    learned: 'Wie Frontend und Backend miteinander reden. CRUD, REST, Zustand.',
    tags: ['JavaScript', 'REST API', 'CRUD'],
    image: todo,
    link: 'https://github.com/Mustafa-Sagaaro/m294-lb-Mustafa_Sagaaro',
  },
  {
    title: 'The API Avengers',
    kind: 'Rezept-App',
    text: 'Rezepte live aus einer externen API laden, durchsuchen und anzeigen. Entstanden an der Code Week.',
    learned: 'Mit fremden APIs arbeiten, asynchroner Code, Fehler sauber abfangen.',
    tags: ['JavaScript', 'Fetch API', 'UI'],
    image: recipes,
    link: 'https://github.com/Mustafa-Sagaaro/CodeWeekWebAnwendung',
  },
]

export const principles = [
  ['Stabil', 'Was in der Basis steckt, muss einfach funktionieren. Jeden Tag, für alle, die darauf aufbauen.'],
  ['Wiederverwendbar', 'Einmal sauber gebaut, vielfach genutzt. Gute Bausteine sparen anderen Teams Zeit.'],
  ['Verständlich', 'Code wird öfter gelesen als geschrieben. Also schreibe ich ihn so, dass man ihn versteht.'],
]

export const stack = ['React', 'JavaScript', 'Three.js', 'GSAP', 'HTML', 'CSS', 'REST APIs', 'Git', 'Vite', 'WebGL']
