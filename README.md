# 📰 HabaruBlog

> **HabaruBlog** est un **blog portfolio moderne et minimaliste**, développé avec **Next.js** et **Tailwind CSS**, destiné à partager des articles, des projets et des informations personnelles de manière professionnelle.
> Il comprend trois sections principales : **Accueil**, **Blog**, et **À propos**.

---

## 🚀 Fonctionnalités principales

* 🌐 **Page d’accueil (Home)** – Présentation personnelle ou du projet, avec un aperçu du contenu récent.
* ✍️ **Section Blog** – Liste et lecture d’articles au format Markdown, gérés localement ou depuis une source CMS.
* 👤 **Page À propos (About)** – Brève biographie, parcours, compétences et liens vers les réseaux sociaux.
* ⚡ **Performances optimisées** – Développé avec **Next.js 14+**, **Bun**, et **TailwindCSS**.
* 📱 **Design responsive** – S’adapte à toutes les tailles d’écran.
* 🔍 **Optimisation SEO de base** – Balises meta, sitemap, et structure sémantique HTML claire.
* ☁️ **Déploiement facile** – Compatible avec **Vercel** et **Netlify**.

---

## 🏗️ Stack technique

| Catégorie               | Technologie utilisée                     |
| ----------------------- | ---------------------------------------- |
| Framework Frontend      | [Next.js](https://nextjs.org/)           |
| Langage                 | TypeScript / JavaScript                  |
| CSS Framework           | [Tailwind CSS](https://tailwindcss.com/) |
| Gestionnaire de paquets | [Bun](https://bun.sh/)                   |
| Rendu Markdown          | next-mdx, gray-matter                    |
| Déploiement             | Vercel / Netlify                         |

---

## ⚙️ Installation et configuration

### 1️⃣ Cloner le dépôt

```bash
git clone https://github.com/<ton-utilisateur>/HabaruBlog.git
cd HabaruBlog
```

### 2️⃣ Installer les dépendances

Si tu utilises **Bun** :

```bash
bun install
```

Ou avec **npm** :

```bash
npm install
```

### 3️⃣ Lancer le projet en local

```bash
bun run dev
```

ou

```bash
npm run dev
```

👉 Le projet sera accessible sur :
**[http://localhost:3000](http://localhost:3000)**

---

## 🧠 SEO et optimisation

Les sites déployés sur **Vercel** ou **Netlify** ont parfois une faible visibilité SEO **si mal configurés**.
Voici les solutions recommandées :


4. **Partager sur les réseaux sociaux** pour générer du trafic et du référencement naturel (backlinks).

---

## 📦 Déploiement

### 🔹 Sur **Vercel**

1. Connecte ton compte GitHub à [Vercel](https://vercel.com/).
2. Clique sur **“New Project”**, puis importe le repo **HabaruBlog**.
3. Vercel détectera automatiquement **Next.js** et lancera le déploiement.

### 🔹 Sur **Netlify**

1. Connecte ton repo à [Netlify](https://app.netlify.com/).
2. Build command :

   ```
   bun run build
   ```
3. Publish directory :

   ```
   .next
   ```

---

## ✨ Personnalisation

* 🧩 Modifier `about.tsx` pour personnaliser ta biographie.
* 📝 Ajouter de nouveaux articles dans le dossier `posts/`.
* 🎨 Modifier les couleurs dans `tailwind.config.js`.
* 🔗 Ajouter tes liens GitHub, LinkedIn, etc., dans le footer.

---

## 🧾 Licence

Ce projet est sous licence **MIT** – tu peux le réutiliser, le modifier et le distribuer librement avec attribution.

---

## 👨🏽‍💻 Auteur

**Amadou Habou GREMAH Mahamadou**
📍 Développeur web & étudiant en génie logiciel
🌐 [Portfolio](https://habarublog.vercel.app)
✉️ Contact : gremah.tech@gmai
