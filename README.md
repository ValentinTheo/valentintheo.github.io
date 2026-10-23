# valentintheo.github.io

Personal academic website, built with Jekyll and served by GitHub Pages.

## Where to edit

| What | File |
|---|---|
| Name, position, email, links, CV file | `_config.yml` (section `author`) |
| Short bio at the top | `index.md` |
| Working papers (abstract, coauthors, awards, figures, presentations, PDF) | `_data/papers.yml` |
| Work in progress | `_data/work_in_progress.yml` |
| Non-academic publications | `_data/non_academic.yml` |
| Teaching | `_data/teaching.yml` |
| Page structure | `_layouts/home.html` |
| Styles | `assets/css/style.css` |
| Fold-out buttons and navigation | `assets/js/main.js` |

Each data file starts with a comment listing its fields. To add a paper, copy an
existing entry in `_data/papers.yml` and change the values; to show a PDF button,
put the link in `pdf` (for example `/files/my-paper.pdf`).

PDFs and figures go in `files/`, images in `images/`.

## Local preview

```
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000.
