/*
  We Design — Interactive Showcase App
*/
(function() {
  const state = {
    creators: [],
    scene: null,
    hotspotsEl: null,
    transform: { x: 0, y: 0, scale: 1 },
    dragging: false,
    dragStart: { x: 0, y: 0 },
    transformStart: { x: 0, y: 0 },
    activeId: null,
    touches: new Map(),
    pinchStart: null,
    galleryItems: [],
    lightboxIndex: 0
  };

  // Local fallback data so the gallery works without a web server
  // Uses images from assets/images mapped to each artist
  const LOCAL_CREATORS_DATA = {
    "creators": [
      {
        "id": "c1",
        "name": "Charles Khoury",
        "slug": "charles-khoury",
        "x": 18,
        "y": 22,
        "summary": "Lebanese post-war contemporary artist (b. 1966, Beirut) known for his vibrant, symbolic works exploring humanity, memory, and coexistence. His art bridges abstraction and expressionism, often portraying playful figures within chaotic harmony.",
        "details": "CHARLES KHOURY\n\nOverview:\nLebanese post-war contemporary artist (b. 1966, Beirut) known for his vibrant, symbolic works exploring humanity, memory, and coexistence. His art bridges abstraction and expressionism, often portraying playful figures within chaotic harmony.\n\nConcept Idea:\nHe reinterpreted one of his earlier sculptures into a sculptural chair, transforming artistic form into functional design while retaining its abstract and expressive essence.\n\nTechnology Used by Naggiar:\nMain structure: 10 mm steel, laser-cut, bent, and welded.\nFinished in black powder coat.\nColored parts were first modeled in cardboard, then replicated in powder-coated steel and glued to the main frame.\n\nBiography:\nGraduate of ALBA (Lebanese Academy of Fine Arts); member of UNESCO Paris through the International Association of Fine Arts.\nExhibited globally (France, UK, Dubai, China, etc.) and winner of the Special Jury Award at Nicolas Sursock Museum (2008).\nInfluences: Kandinsky, Klee, Picasso.\nStyle: Thick outlines, overlapping forms, coexistence motifs.\n\nArtist Cartel\nNaggiar x Wedesign",
        "image": "assets/images/Charles Khoury.jpg"
      },
      {
        "id": "c2",
        "name": "Zena Assi",
        "slug": "zena-assi",
        "x": 35,
        "y": 30,
        "summary": "Lebanese-born (1974), London-based artist whose multidisciplinary work examines migration, urban memory, and identity through painting, sculpture, and installation.",
        "details": "ZENA ASSI\n\nOverview:\nLebanese-born (1974), London-based artist whose multidisciplinary work examines migration, urban memory, and identity through painting, sculpture, and installation.\n\nConcept Idea:\n\"Anatomy of a Bloom\" — a hybrid flower sculpture (organic + industrial) symbolizing displacement, resilience, and survival.\nPetals bear Beirut's cityscape and miniature figures, echoing memory and conflict; inspired by Louise Bourgeois' Maman.\n\nTechnology Used by Naggiar:\nLaser-cut stainless-steel sheets, welded rods.\n3D-printed figures cast in brass, oxidized for gunmetal finish.\nUV printing on metal surfaces to apply detailed imagery.\nDeveloped from a tape-and-stick mock-up, scaled to 2 m.\nRequired precise digital modeling for fluidity and detail.\n\nBiography:\nAward-winning artist (Royal Academy 2020, SWA 2018, Sursock 2009).\nHer works are in Institut du Monde Arabe, Barjeel Foundation, and ALBA collections.\nExhibited worldwide (Royal Academy London, Tanit Gallery, Venice Biennale 2017, MOCA Saudi Arabia 2025).\nWebsite: www.zenaassi.com\n\nArtist Cartel\nNaggiar x Wedesign",
        "image": "assets/images/Zena Assi by Gibert Hage.jpg"
      },
      {
        "id": "c3",
        "name": "Wissam (Ouisam) Melhem",
        "slug": "ouisam-melhem",
        "x": 56,
        "y": 18,
        "summary": "Lebanese architect, painter, and sculptor exploring human identity through symbols like the city, bird, and cloud. Teaches at AUB, ALBA, NDU, and LU.",
        "details": "WISSAM (OUISAM) MELHEM\n\nOverview:\nLebanese architect, painter, and sculptor exploring human identity through symbols like the city, bird, and cloud. Teaches at AUB, ALBA, NDU, and LU.\n\nConcept Idea:\n\"Bel Wejj Mreyeh (Oh Mirror Mirror)\" — examines our digital reflection and the fragmented identity shaped by technology and AI.\nMirrored boxes represent screens that distort perception and individuality.\n\nTechnology Used by Naggiar:\nLaser-cut brushed and mirror-finish stainless steel.\nOxidized surfaces for tonal contrast.\nWelded and passivated structure for seamless surfaces.\nAluminum spheres polished to mirror finish as \"floating clouds.\"\n\nBiography:\nBorn 1974. Holds degrees in Architecture and Landscape Urbanism.\nExhibited globally (Lebanon, Spain, Japan, Egypt, USA).\nDeveloped the \"reKUNSTruction\" concept — art as rebuilding human consciousness.\n\nArtist Cartel\nNaggiar x Wedesign",
        "image": "assets/images/Wissam Melhem  .jpg"
      },
      {
        "id": "c4",
        "name": "Nayla Kai Saroufim",
        "slug": "nayla-saroufim",
        "x": 74,
        "y": 28,
        "summary": "Lebanese artist based between Los Angeles and Beirut. Known for vibrant mixed-media works blending pop art, abstraction, and industrial materials.",
        "details": "NAYLA KAI SAROUFIM\n\nOverview:\nLebanese artist based between Los Angeles and Beirut.\nKnown for vibrant mixed-media works blending pop art, abstraction, and industrial materials.\n\nConcept Idea:\n\"The 4 Fs — Flight, Freedom, Fearlessness, Faith\"\nA sculptural lighting piece featuring four symbolic elements: nest, bird, bullet, and spiral, narrating resilience, hope, and transformation.\n\nTechnology Used by Naggiar:\nLaser-cut steel (red), brass (dome), stainless steel (other parts).\nOrigami-shaped birds welded and folded with precision.\nWelding + passivation for seamless finish.\nIntegrated lighting and electrical system for dual art-function role.\n\nBiography:\nHolds degree in Illustration & Art Direction (ALBA).\nActive for 20+ years, exhibited globally (LA, NY, Paris, Seoul, Doha).\nKnown for transforming industrial materials into poetic metal installations.\n\nArtist Cartel\nNaggiar x Wedesign",
        "image": "assets/images/Nayla Saroufim 02_FINAL.jpg"
      },
      {
        "id": "c5",
        "name": "Nayla Romanos Iliya",
        "slug": "nayla-romanos-iliya",
        "x": 82,
        "y": 46,
        "summary": "Lebanese architect and artist whose sculptures bridge architecture and emotion. Her art transforms personal and social narratives into poetic forms.",
        "details": "NAYLA ROMANOS ILIYA\n\nOverview:\nLebanese architect and artist whose sculptures bridge architecture and emotion.\nHer art transforms personal and social narratives into poetic forms.\n\nConcept Idea:\n\"Memorial of Light\" — commemorates victims of the Beirut Port explosion (Aug 4 2020).\nA conical mirrored core and 218 illuminated brass cylinders represent lost lives, while perforations symbolize scars.\n\nTechnology Used by Naggiar:\nLaser-cut stainless steel and brass sheets.\nPerforation, micro-welding, and rolling of cones and dome.\nBrass oxidation, electrical integration, and metal subframe fabrication.\nPrecise craftsmanship to balance light, memory, and reflection.\n\nBiography:\nArchitect-turned-sculptor, active since 2011.\nHer works are in major institutions: Institut du Monde Arabe, AUB Museum, Bagri Foundation, and soon British Museum.\nLives between London and Beirut.\n\nArtist Cartel\nNaggiar x Wedesign",
        "image": "assets/images/Nayla Romanos ILIYA by Maher Attar.jpg"
      },
      {
        "id": "c6",
        "name": "Missak Terzian",
        "slug": "missak-terzian",
        "x": 66,
        "y": 62,
        "summary": "Lebanese-American artist (b. 1949, Beirut) of Armenian descent; known for semi-abstract and geometric abstraction exploring spirituality and nature.",
        "details": "MISSAK TERZIAN\n\nOverview:\nLebanese-American artist (b. 1949, Beirut) of Armenian descent; known for semi-abstract and geometric abstraction exploring spirituality and nature.\n\nConcept Idea:\n\"Olive Tree\" — a 3 m stainless-steel sculpture symbolizing resilience, peace, and nature's generosity.\nDepicts the olive tree as eternal giver — a monument of endurance and renewal.\n\nTechnology Used by Naggiar:\nLaser-cut stainless-steel sheets (mirror + brushed).\nCutting, welding, heating, and hand molding to shape organic leaves.\nEntirely crafted without fabrication drawings, relying on visual interpretation.\n\nBiography:\nStudied at Ecole d'Art Guvder and London College of Printing.\nExhibited in 148 global shows; works in Institut du Monde Arabe and Sursock Museum.\nExplores transcendence, spirituality, and time through color and nature.\n\nArtist Cartel\nNaggiar x Wedesign",
        "image": "assets/images/Missak.jpg"
      },
      {
        "id": "c7",
        "name": "Marie Munier",
        "slug": "marie-munier",
        "x": 44,
        "y": 72,
        "summary": "Legendary Lebanese jewelry designer since the 1970s; known for ancient Mediterranean-inspired luxury art jewelry and lighting.",
        "details": "MARIE MUNIER\n\nOverview:\nLegendary Lebanese jewelry designer since the 1970s; known for ancient Mediterranean-inspired luxury art jewelry and lighting.\n\nConcept Idea:\n\"SUKUN (Stillness)\" — a kinetic light sculpture symbolizing inner calm and motion within silence.\nRotating brass-and-iron form projects rhythmic shadows and meditative light.\n\nTechnology Used by Naggiar:\nLaser-cut 10 mm steel & 2 mm brass sheets.\nWelded steel structure with a swivel-axis mechanism.\nPolished brass, powder-coated steel, matte lacquer finish.\nIntegrated lighting system for balanced illumination.\n\nBiography:\nTrained in interior design at ALBA; began with painting, then moved to jewelry.\nKnown for handcrafted 22 kt gold-dipped designs and historic motifs.\nExhibited for 50+ years; continues to expand into lighting sculpture.\n\nArtist Cartel\nNaggiar x Wedesign",
        "image": "assets/images/mariemunier.jpg"
      },
      {
        "id": "c8",
        "name": "Karen Chekerdjian",
        "slug": "karen-chekerdjian",
        "x": 26,
        "y": 64,
        "summary": "Lebanese designer blending industrial design with narrative art. Educated at Domus Academy (Milan), mentored by Massimo Morozzi.",
        "details": "KAREN CHEKERDJIAN\n\nOverview:\nLebanese designer blending industrial design with narrative art.\nEducated at Domus Academy (Milan), mentored by Massimo Morozzi.\n\nConcept Idea:\n\"Bomber Console\" — inspired by aerodynamics and balance, featuring a wing-like brass top and riveted precision structure.\n\nTechnology Used by Naggiar:\nStainless-steel structure clad in brass sheets.\nLaser cutting, rolling, and brushing.\nStud welding + CNC-fabricated studs for precision.\nLacquered finish enhancing metallic tones and durability.\n\nBiography:\nFrom film sets to Milan studios, Chekerdjian merges art and design.\nExhibited at Sfeir-Semler Gallery, Design Miami, Institut du Monde Arabe, and Milan Furniture Fair.\nRuns a Beirut studio focusing on limited-edition pieces.\n\nArtist Cartel\nNaggiar x Wedesign",
        "image": "assets/images/Karen's portrait by alain sauma 1 (1).jpg"
      },
      {
        "id": "c9",
        "name": "Joseph El Hourany",
        "slug": "joseph-el-hourany",
        "x": 16,
        "y": 46,
        "summary": "Lebanese architect, urban planner, philosopher, and artist exploring the boundary between material and concept via procedural sculpture.",
        "details": "JOSEPH EL HOURANY\n\nOverview:\nLebanese architect, urban planner, philosopher, and artist exploring the boundary between material and concept via procedural sculpture.\n\nConcept Idea:\n\"Head\" — deconstructs portraiture into geometric fragments within ellipses and rectangles.\nExplores abstraction, composition, and the essence of identity through structure.\n\nTechnology Used by Naggiar:\nBased on a 20 cm hand-carved wooden model, scaled to 2 m using 3D scanning.\nConverted into 2D surfaces, then laser-cut, bent, and welded in stainless steel.\nPassivated finish to preserve detail and durability.\n\nBiography:\nHolds multiple degrees (Architecture, Philosophy, Musicology).\nDoctoral research at MIT on parametric architecture.\nPresident of the Arab Architects Association (2023).\nPublished author and exhibited internationally.\n\nArtist Cartel\nNaggiar x Wedesign",
        "image": "assets/images/Joseph El Hourany .jpg"
      },
      {
        "id": "c10",
        "name": "Ihab Ahmad",
        "slug": "ihab-ahmad",
        "x": 52,
        "y": 44,
        "summary": "Lebanese visual artist (b. 1983) blending painting and sculpture to create whimsical, symbolic worlds filled with eyes, crowns, and trees.",
        "details": "IHAB AHMAD\nBiography:\nMarie Munier is a pioneering Lebanese jewelry designer who launched her eponymous label\nin Beirut in the early 1970s. Originally trained in interior design at the Lebanese Academy of\nFine Arts, she began her artistic career as a painter before ﬁnding her true medium in jewelry\n— inspired by the grandeur of ancient Mediterranean civilizations.\nRenowned for her distinctive, handcrafted pieces that often incorporate antique elements and\nher signature 22kt gold dip technique, Marie has forged a legacy as a creative visionary\nwhose work has captivated audiences in Lebanon and beyond for over ﬁve decades.\nToday, she continues to evolve her artistic expression, expanding into lighting sculpture with\npieces that echo the graphic beauty of her jewelry. From canvas to couture, her work is a\nreﬂection of enduring passion and innovation — \"In creation, there is always evolution\nConcept Idea:\nSUKUN , stillness, inner calm — is both the name and essence of this luminous sculpture.\nCrafted in brass and iron, its form moves in perpetual rotation, casting shifting shadows\nacross the ceiling. These light traces echo the balance of opposites: presence and absence,\ndark and light, motion and pause.\nThough always in motion, SUKUN invites quiet. Its hypnotic rhythm draws the viewer inward,\noffering a moment of suspended time — a breath, a silence — in a world that rarely stops.\nTechnology used by Naggiar:\nThe piece was realized through laser cutting of 10 mm steel and 2 mm brass sheets, followed by\nwelding and fabrication of the steel structure and the integration of a custom swivel-axis mechanism.\nSurface treatments included polishing and mirroring of brass sheets on one side, powder coating of\nsteel elements, and application of a transparent matte lacquer on brass surfaces for protection and\nsubtle sheen.\nThe work also incorporated lighting design and complete electrical integration, ensuring both\nfunctional illumination and aesthetic harmony.\nOption 2:\n- The piece was realized through laser cutting of 10 mm steel and 2 mm brass sheets.\n- Welding and fabrication of the steel structure were completed, including integration of a custom\nswivel-axis mechanism.\n- Surface treatments included polishing and mirroring of brass sheets on one side.\n- Steel elements were powder-coated, and a transparent matte lacquer was applied on brass surfaces\nfor protection and subtle sheen.\n- The work incorporated lighting design and complete electrical integration, ensuring both functional\nillumination and aesthetic harmony.\nArtist Cartel\nNaggiar x Wedesign\nKAREN CHEKERDJIAN\nBiography:\nKaren Chekerdjian Biography:\nFrom Beirut’s ﬁlm sets to Milan’s design studios, Karen Chekerdjian has always followed\nher curiosity. She earned her Master’s in Industrial Design at Domus Academy, in 1997,\nwhere she created Mobil, her ﬁrst piece for Edra under the mentorship of Massimo Morozzi.\nRejecting following one single direction, Chekerdjian intersects art, design, and space,\nque",
        "image": "assets/images/Ihab Ahmad.jpg"
      },
      {
        "id": "c11",
        "name": "Ghazi Baker",
        "slug": "ghazi-baker",
        "x": 50,
        "y": 50,
        "summary": "Lebanese-Iranian-Armenian artist and architect (b. 1967) known for \"visual jazz\" — dynamic, cerebral, post-structural compositions merging philosophy, pop culture, and abstraction.",
        "details": "GHAZI BAKER\n\nOverview:\nLebanese-Iranian-Armenian artist and architect (b. 1967) known for \"visual jazz\" — dynamic, cerebral, post-structural compositions merging philosophy, pop culture, and abstraction.\n\nConcept Idea:\n\"Flora Mechanica\" — a synthetic metallic flower representing the mechanization of nature.\nCombines natural elegance with artificial precision — a post-human bloom questioning beauty and control.\n\nTechnology Used by Naggiar:\nLaser cutting, milling, welding, and passivation of brushed stainless steel.\nMulti-layer powder coating (five layers) for structure and color.\nAssembled meticulously to mimic botanical veins and petals.\nBalances fragility of nature with technological rigidity.\n\nBiography:\nSelf-taught artist, architect (AUB 1991).\nExhibited worldwide — Art Miami, KIAF Seoul, Zonamaco Mexico, Rijksmuseum Amsterdam.\nWork spans philosophy, architecture, and comic aesthetics; featured in major global collections.\n\nArtist Cartel\nNaggiar x Wedesign",
        "image": "assets/images/Ghazi Baker .jpg"
      }
    ]
  };

  const $ = (sel) => document.querySelector(sel);
  const hasGSAP = typeof window !== 'undefined' && typeof window.gsap !== 'undefined';
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function clamp(val, min, max) { return Math.max(min, Math.min(max, val)); }

  function setSceneTransform(x, y, scale) {
    state.transform.x = x; state.transform.y = y; state.transform.scale = scale;
    state.scene.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  }

  function animateTransform(toX, toY, toScale, durationSec) {
    const duration = prefersReducedMotion ? 0 : durationSec;
    if (hasGSAP && duration > 0) {
      gsap.to(state.transform, {
        duration,
        x: toX,
        y: toY,
        scale: toScale,
        ease: 'power3.out',
        onUpdate: () => setSceneTransform(state.transform.x, state.transform.y, state.transform.scale)
      });
      return;
    }
    setSceneTransform(toX, toY, toScale);
  }

  function distance(a, b) {
    const dx = a.clientX - b.clientX;
    const dy = a.clientY - b.clientY;
    return Math.hypot(dx, dy);
  }

  function midpoint(a, b) {
    return { x: (a.clientX + b.clientX) / 2, y: (a.clientY + b.clientY) / 2 };
  }

  // Helper function to extract family name (last name)
  function getFamilyName(fullName) {
    const parts = fullName.trim().split(' ');
    return parts[parts.length - 1].toLowerCase();
  }

  async function loadCreators() {
    try {
      const timestamp = new Date().getTime();
      const res = await fetch(`assets/data/creators.json?v=${timestamp}`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      // Sort creators by family name (last name) alphabetically
      state.creators = (json.creators || []).sort((a, b) => {
        const nameA = getFamilyName(a.name);
        const nameB = getFamilyName(b.name);
        return nameA.localeCompare(nameB);
      });
      console.log('Creators sorted by family name:', state.creators.map(c => c.name));
    } catch (err) {
      console.error('Failed to load creators.json, using local fallback.', err);
      // Fallback to bundled data so gallery still shows local images
      state.creators = (LOCAL_CREATORS_DATA.creators || []).sort((a, b) => {
        const nameA = getFamilyName(a.name);
        const nameB = getFamilyName(b.name);
        return nameA.localeCompare(nameB);
      });
      const hint = $('#hint');
      if (hint) {
        hint.textContent = 'Tip: open via http://localhost (not file://) to load data';
        hint.style.opacity = '1';
      }
    }
  }

  function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }

  function buildGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;
    grid.innerHTML = '';
    state.galleryItems = [];
    const fallbackImgs = Array.from({ length: (state.creators && state.creators.length) || 12 }, (_, i) => `https://picsum.photos/seed/we-design-${i}/800/1000`);
    const list = (state.creators && state.creators.length)
      ? state.creators
      : fallbackImgs.map((src, i) => ({ id: `p${i}`, name: `Artwork ${i+1}`, images: [src], year: '', materials: '', dimensions: '' }));
    
    console.log('Building gallery with', list.length, 'creators');
    
    // Create two separate columns for mobile layout
    const column1 = document.createElement('div');
    column1.className = 'gallery-column gallery-column-1';
    
    const column2 = document.createElement('div');
    column2.className = 'gallery-column gallery-column-2';
    
    list.forEach((c, i) => {
      // Prioritize c.image (string) over c.images (array) since our JSON uses singular 'image'
      const src = c.image || (Array.isArray(c.images) && c.images[0]) || fallbackImgs[i] || fallbackImgs[0];
      
      console.log(`Creator ${i+1}: ${c.name}`, 'Image:', src);
      
      const card = document.createElement('div'); 
      card.className = 'card';
      card.setAttribute('data-artist-name', c.name || `Artwork ${i+1}`);
      
      const img = document.createElement('img'); 
      img.src = src; 
      img.alt = c.name || `Artwork ${i+1}`;
      img.onerror = () => {
        console.error('Failed to load image:', src);
        img.src = fallbackImgs[i] || fallbackImgs[0];
      };
      card.appendChild(img);
      
      const title = document.createElement('div'); 
      title.className = 'card-title'; 
      title.textContent = c.name || `Artwork ${i+1}`; 
      card.appendChild(title);
      
      const index = state.galleryItems.length;
      state.galleryItems.push({ src, title: c.name || `Artwork ${i+1}`, meta: [c.year, c.materials, c.dimensions].filter(Boolean).join(' • '), creator: c });
      card.addEventListener('click', () => openLightbox(index));
      
      // Distribute cards: First 6 cards in column 1, remaining 5 cards in column 2
      if (i < 6) {
        column1.appendChild(card);
      } else {
        column2.appendChild(card);
      }
      
      if (hasGSAP && !prefersReducedMotion) gsap.from(card, { opacity: 0, y: 16, duration: 0.5, ease: 'power3.out', delay: i * 0.04 });
    });
    
    // Append both columns to the grid
    grid.appendChild(column1);
    grid.appendChild(column2);
  }

  // Mapping of per-artist info replacing the Overview in the lightbox
  // Keys are creator slugs as present in creators.json
  const CREATOR_INFO = {
    'marie-munier': {
      title: 'SUKUN',
      dimensions: '1000x1000 H=2000 mm',
      materials: 'Steel & Brass'
    },
    'charles-khoury': {
      title: 'The chair',
      dimensions: '650x1000 H=1800 mm',
      materials: 'Steel'
    },
    'nayla-saroufim': {
      title: 'The 4 Fs: Flight. Freedom. Fearlessness. Faith.',
      dimensions: '700x2000 H=1000 mm',
      materials: 'Steel, Brass & Stainless Steel'
    },
    'zena-assi': {
      title: 'Anatomy of a Bloom',
      dimensions: '1500x1500 H=2300 mm',
      materials: 'Stainless Steel Gun Metal with UV Printing and Brass Casting'
    },
    'missak-terzian': {
      title: 'Olive Tree',
      dimensions: 'Ø 4000 Dia H=3500 mm',
      materials: 'Stainless Steel Grade 316'
    },
    'ouisam-melhem': {
      title: 'Bel Wejj Mreyeh, or Oh Mirror Mirror',
      dimensions: '1800x1500 H=2200 mm',
      materials: 'Stainless Steel Gun Metal and Super Mirroring + Aluminium'
    },
    'ihab-ahmad': {
      title: 'The Surface of Dreams',
      dimensions: '1000x2000 H=750 mm',
      materials: 'Steel'
    },
    'karen-chekerdjian': {
      title: 'Bomber Console',
      dimensions: '1800x550 H=800 mm',
      materials: 'Brass'
    },
    'nayla-romanos-iliya': {
      title: 'MEMORIAL OF LIGHT',
      dimensions: 'Ø 1450, D=200 mm',
      materials: 'Brass + Stainless Steel Gun Metal and Supermirror'
    },
    'ghazi-baker': {
      title: 'Flora Mechanica',
      dimensions: '800x1400 H=2200 mm',
      materials: 'Stainless Steel Grade 304'
    },
    'joseph-el-hourany': {
      title: 'Head',
      dimensions: '1500x1500 H=2000 mm',
      materials: 'Stainless Steel Grade 304'
    }
  };

  // Parse sections from PDF-like text in creators.json
  function parsePdfSections(c) {
    const text = [c.details || '', c.summary || ''].join('\n');
    const lines = text.split(/\r?\n/).map(s => s.trim());
    const isHeading = (s) => /^(biography|concept( idea)?|purpose|technology.*|process|procedure)[:\-]?$/i.test(s);
    const map = { overview: [], purpose: [], procedure: [], about: [] };
    let mode = 'overview';
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i];
      if (!l) { if (mode) map[mode].push(''); continue; }
      if (/^biography[:\-]?$/i.test(l)) { mode = 'about'; continue; }
      if (/^(concept( idea)?|purpose)[:\-]?$/i.test(l)) { mode = 'purpose'; continue; }
      if (/^(technology.*|process|procedure|main manufacturing techniques|option 2)[:\-]?$/i.test(l)) { mode = 'procedure'; continue; }
      // stop on section labels that are unrelated headers like emails/urls
      map[mode].push(l);
    }
    const trimmed = (arr) => arr.join('\n').trim();
    const result = {
      'Overview': trimmed(map.overview) || (c.summary || '').trim(),
      'Purpose': trimmed(map.purpose),
      'Procedure': trimmed(map.procedure),
      'About artist': trimmed(map.about)
    };
    // Fallbacks
    if (!result['About artist'] && /born|lives|works|artist/i.test(text)) {
      // try to heuristically pull first biography paragraph
      const bioMatch = text.match(/biography[:\-]?\s*([\s\S]{0,1200})/i);
      if (bioMatch) result['About artist'] = bioMatch[1].trim();
    }
    if (!result['Purpose']) {
      const m = text.match(/concept(?: idea)?[:\-]?\s*([\s\S]{0,1200}?)(?:\n[A-Z][A-Z ]{2,}|$)/i);
      if (m) result['Purpose'] = m[1].trim();
    }
    if (!result['Procedure']) {
      const m2 = text.match(/(technology.*|process|procedure)[:\-]?\s*([\s\S]{0,1400})/i);
      if (m2) result['Procedure'] = (m2[2] || '').trim();
    }
    return result;
  }

  function openLightbox(index) {
    state.lightboxIndex = index;
    const item = state.galleryItems[index];
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    const imgBack = document.getElementById('lightboxImgBack');
    const meta = document.getElementById('lightboxMeta');
    const details = document.getElementById('lightboxDetails');
    const card = document.getElementById('lightboxCard');
    if (!lb) return;
    
    // Update URL with artist slug for shareable QR codes
    const creator = item.creator;
    if (creator) {
      const slug = creator.slug || slugify(creator.name);
      history.replaceState(null, '', `#${slug}`);
      console.log('Lightbox URL:', window.location.href);
    }
    
    // Pre-animation setup
    lb.style.display = 'flex';
    lb.style.opacity = '0';
    const inner = lb.querySelector('.lightbox-inner');
    if (inner) {
      inner.style.transform = 'scale(0.8) translateY(40px)';
    }
    
    img.src = item.src; imgBack.src = item.src; meta.textContent = item.meta || '';
    // Build back content from the creator data
    details.innerHTML = '';
    const sections = creator ? parsePdfSections(creator) : { 'Overview': '', 'Purpose': '', 'Procedure': '', 'About artist': '' };
    
    // Inject static info block in place of 'Overview'
    const staticInfo = document.createElement('div');
    staticInfo.className = 'artist-static-info';
    if (creator) {
      const slug = creator.slug || slugify(creator.name);
      const info = CREATOR_INFO[slug];
      if (info) {
        const t = document.createElement('h3'); t.className = 'asi-title'; t.textContent = info.title;
        const dims = document.createElement('div'); dims.className = 'asi-dim'; dims.textContent = info.dimensions;
        const mats = document.createElement('div'); mats.className = 'asi-mat'; mats.textContent = info.materials;
        staticInfo.appendChild(t); staticInfo.appendChild(dims); staticInfo.appendChild(mats);
        details.appendChild(staticInfo);
      }
    }

    // Map internal keys to display titles (excluding Overview)
    const displayTitles = {
      'About artist': 'Biography',
      'Purpose': 'Concept Idea',
      'Procedure': 'Technology used by Naggiar'
      
    };
    
    ['About artist','Purpose','Procedure'].forEach((key) => {
      const row = document.createElement('div'); row.className = 'row';
      const displayTitle = displayTitles[key] || key;
      const header = document.createElement('div'); header.className = 'row-header'; header.innerHTML = `<span>${displayTitle}</span><span>›</span>`;
      const body = document.createElement('div'); body.className = 'row-body'; body.textContent = sections[key] || '';
      header.addEventListener('click', () => { row.classList.toggle('open'); });
      row.appendChild(header); row.appendChild(body); details.appendChild(row);
    });
    card.classList.remove('flip');
    lb.setAttribute('aria-hidden', 'false');
    
    // Enhanced opening animation
    if (hasGSAP && !prefersReducedMotion) {
      gsap.timeline()
        .to(lb, { opacity: 1, duration: 0.3, ease: 'power2.out' })
        .to(inner, { scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.2)' }, 0.1)
        .from(img, { opacity: 0, scale: 0.96, duration: 0.35, ease: 'power2.out' }, 0.2);
    } else {
      lb.style.opacity = '1';
      if (inner) {
        inner.style.transform = 'scale(1) translateY(0)';
      }
    }
  }

  function stepLightbox(dir) {
    if (!state.galleryItems.length) return;
    state.lightboxIndex = (state.lightboxIndex + dir + state.galleryItems.length) % state.galleryItems.length;
    openLightbox(state.lightboxIndex);
  }

  function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (!lb) return;
    
    // Clear the URL hash when closing
    history.replaceState(null, '', window.location.pathname);
    
    // Enhanced closing animation
    if (hasGSAP && !prefersReducedMotion) {
      const inner = lb.querySelector('.lightbox-inner');
      gsap.timeline()
        .to(inner, { scale: 0.8, y: 40, duration: 0.3, ease: 'power2.in' })
        .to(lb, { opacity: 0, duration: 0.2, ease: 'power2.in' }, 0.1)
        .call(() => {
          lb.setAttribute('aria-hidden', 'true');
          lb.style.display = 'none';
        });
    } else {
      lb.setAttribute('aria-hidden', 'true');
      lb.style.display = 'none';
      lb.style.opacity = '0';
    }
  }

  function buildHotspots() {
    state.hotspotsEl.innerHTML = '';
    state.creators.forEach((c, i) => {
      const el = document.createElement('button');
      el.className = 'hotspot';
      el.type = 'button';
      el.style.left = c.x + '%';
      el.style.top = c.y + '%';
      el.setAttribute('aria-label', `Open ${c.name}`);
      el.dataset.id = c.id;

      // Assign a colorful gradient hue per hotspot for a more artistic look
      const hue = (i * 33) % 360;
      el.style.background = `radial-gradient(circle at 30% 30%, #fff, hsl(${hue}, 90%, 80%) 30%, hsl(${hue}, 85%, 55%) 60%, hsl(${hue}, 65%, 35%))`;
      el.style.boxShadow = `0 0 0 6px hsla(${hue}, 90%, 70%, 0.20), 0 10px 30px hsla(${hue}, 85%, 50%, 0.45)`;

      const label = document.createElement('div');
      label.className = 'hotspot-label';
      label.textContent = c.name;
      el.appendChild(label);

      el.addEventListener('click', () => openCreator(c.id));
      el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCreator(c.id); } });

      state.hotspotsEl.appendChild(el);
    });
  }

  function openCreator(id) {
    const c = state.creators.find((x) => x.id === id);
    if (!c) return;
    state.activeId = id;

    const rect = state.hotspotsEl.getBoundingClientRect();
    const targetX = (c.x / 100) * rect.width;
    const targetY = (c.y / 100) * rect.height;

    focusOn(targetX, targetY, 1.6, { openSheet: true });
    updateSheet(c);
    history.replaceState(null, '', `#${c.slug || slugify(c.name)}`);
  }

  function focusOn(px, py, targetScale, opts) {
    const options = Object.assign({ openSheet: false }, opts);
    const stageRect = state.hotspotsEl.getBoundingClientRect();
    const sceneRect = state.scene.getBoundingClientRect();
    const currentScale = state.transform.scale;
    const nextScale = targetScale || 1.4;

    const centerX = stageRect.width / 2;
    const centerY = stageRect.height / 2;

    const dx = centerX - px;
    const dy = centerY - py;

    const nextX = state.transform.x + dx;
    const nextY = state.transform.y + dy;

    animateTransform(nextX, nextY, nextScale, 0.9);

    if (options.openSheet) openSheet();
  }

  function openSheet() {
    const sheet = $('#sheet');
    sheet.setAttribute('aria-hidden', 'false');
    if (hasGSAP && !prefersReducedMotion) {
      gsap.fromTo(sheet, { yPercent: 100 }, { duration: 0.5, yPercent: 0, ease: 'power3.out' });
      // Animate elements in
      const tl = gsap.timeline({ defaults: { duration: 0.5, ease: 'power2.out' } });
      tl.from('#sheetMedia', { opacity: 0, y: 10 }, 0.05)
        .from('#sheetChips .chip', { opacity: 0, y: 8, stagger: 0.06 }, 0.1)
        .from('#sheetGallery img', { opacity: 0, y: 12, stagger: 0.04 }, 0.12)
        .from('.accordion-item', { opacity: 0, y: 14, stagger: 0.06 }, 0.14);
    } else {
      sheet.style.transform = 'translateY(0)';
    }
    // Move focus to title so the sheet is active and scrollable on mobile
    const title = $('#sheetTitle');
    if (title) title.focus({ preventScroll: true });
  }

  function closeSheet() {
    const sheet = $('#sheet');
    sheet.setAttribute('aria-hidden', 'true');
    if (hasGSAP && !prefersReducedMotion) {
      gsap.to(sheet, { duration: 0.4, yPercent: 100, ease: 'power2.in' });
    } else {
      sheet.style.transform = 'translateY(100%)';
    }
  }

  function updateSheet(c) {
    $('#sheetTitle').textContent = c.name || '';
    const body = $('#sheetSummary');
    const chips = document.getElementById('sheetChips');
    const gallery = document.getElementById('sheetGallery');
    const sections = document.getElementById('sheetSections');
    const tabs = document.getElementById('sheetTabs');

    // Reset containers
    body.textContent = '';
    chips.innerHTML = '';
    gallery.innerHTML = '';
    sections.innerHTML = '';
    tabs.innerHTML = '';
    tabs.setAttribute('aria-hidden', 'true');

    // Quick facts chips if present
    const facts = [];
    if (c.year) facts.push(String(c.year));
    if (c.dimensions) facts.push(c.dimensions);
    if (c.materials) facts.push(c.materials);
    if (c.location) facts.push(c.location);
    if (facts.length) {
      chips.removeAttribute('aria-hidden');
      facts.forEach((t) => { const el = document.createElement('span'); el.className = 'chip'; el.textContent = t; chips.appendChild(el); });
    } else {
      chips.setAttribute('aria-hidden', 'true');
    }

    // Gallery images array
    if (Array.isArray(c.images) && c.images.length) {
      gallery.removeAttribute('aria-hidden');
      c.images.forEach((src) => { const img = document.createElement('img'); img.src = src; img.alt = `${c.name} image`; gallery.appendChild(img); });
    } else {
      gallery.setAttribute('aria-hidden', 'true');
    }

    // Accordion: try to split details into sections by headings
    const details = (c.details || c.summary || '').trim();
    const parsed = splitIntoSections(details, c);
    if (parsed.length) {
      // Build tabs
      tabs.removeAttribute('aria-hidden');
      parsed.forEach(({ title }, idx) => {
        const t = document.createElement('button');
        t.type = 'button';
        t.className = 'section-tab';
        t.textContent = title;
        t.setAttribute('aria-selected', String(idx === 0));
        t.addEventListener('click', () => {
          // Open the matching accordion panel
          const items = sections.querySelectorAll('.accordion-item');
          items.forEach((item, i) => {
            const header = item.querySelector('.accordion-header');
            const panel = item.querySelector('.accordion-panel');
            const isOpen = i === idx;
            header.setAttribute('aria-expanded', String(isOpen));
            panel.dataset.open = String(isOpen);
          });
          // Update selected tab
          tabs.querySelectorAll('.section-tab').forEach((el) => el.setAttribute('aria-selected', 'false'));
          t.setAttribute('aria-selected', 'true');
          // Scroll panel into view
          const target = sections.querySelectorAll('.accordion-item')[idx];
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
        tabs.appendChild(t);
      });

      parsed.forEach(({ title, content }, idx) => {
        const item = document.createElement('div');
        item.className = 'accordion-item';
        const header = document.createElement('button');
        header.type = 'button';
        header.className = 'accordion-header';
        header.setAttribute('aria-expanded', String(idx === 0));
        header.innerHTML = `<span class="acc-title">${title}</span><span class="acc-icon">›</span>`;
        const panel = document.createElement('div');
        panel.className = 'accordion-panel';
        panel.dataset.open = String(idx === 0);
        // Creative biography layout
        if (/^biography$/i.test(title)) {
          const grid = document.createElement('div');
          grid.className = 'bio-grid';
          const left = document.createElement('div');
          left.className = 'bio-card';
          const right = document.createElement('div');
          right.className = 'bio-card';
          const hLeft = document.createElement('h4'); hLeft.textContent = 'Highlights';
          const hRight = document.createElement('h4'); hRight.textContent = 'Timeline';
          const ul = document.createElement('ul'); ul.className = 'bio-list';
          // Split content by sentences; first few as highlights
          const parts = content.split(/(?<=[.!?])\s+/).filter(Boolean);
          parts.slice(0, 4).forEach(t => { const li = document.createElement('li'); li.textContent = t; ul.appendChild(li); });
          left.appendChild(hLeft); left.appendChild(ul);
          // Rest as timeline lines
          const p = document.createElement('p'); p.textContent = parts.slice(4).join(' ');
          right.appendChild(hRight); right.appendChild(p);
          grid.appendChild(left); grid.appendChild(right);
          panel.appendChild(grid);
        } else {
          panel.textContent = content;
        }
        header.addEventListener('click', () => {
          const expanded = header.getAttribute('aria-expanded') === 'true';
          header.setAttribute('aria-expanded', String(!expanded));
          panel.dataset.open = String(!expanded);
        });
        item.appendChild(header);
        item.appendChild(panel);
        sections.appendChild(item);
      });
    } else {
      // Fallback to raw text
      body.textContent = details;
    }
    const media = $('#sheetMedia');
    media.innerHTML = '';
    if (c.image) {
      const img = document.createElement('img');
      img.src = c.image;
      img.alt = `${c.name} preview`;
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      media.appendChild(img);
      media.removeAttribute('aria-hidden');
    } else {
      media.setAttribute('aria-hidden', 'true');
    }
  }

  function splitIntoSections(text, c) {
    const lines = text.split(/\r?\n/).map((l) => l.trim());
    const sections = [];
    let current = { title: 'Overview', content: [] };
    const headingRe = /^(bio(graphy)?|statement|work|project|materials|dimensions|awards|education|exhibitions|press|about)[:\-]?$/i;
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i];
      if (!l) { current.content.push(''); continue; }
      if (headingRe.test(l)) {
        if (current.content.length) sections.push({ title: current.title, content: current.content.join('\n').trim() });
        current = { title: capitalize(l.replace(/[:\-]$/,'')), content: [] };
      } else {
        current.content.push(l);
      }
    }
    if (current.content.length) sections.push({ title: current.title, content: current.content.join('\n').trim() });
    // Prepend structured fields if present
    const enriched = [];
    if (c.biography) enriched.push({ title: 'Biography', content: c.biography });
    if (c.process) enriched.push({ title: 'Process', content: c.process });
    sections.forEach(s => enriched.push(s));
    return enriched.filter(s => s.content);
  }

  function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  function resetView() {
    state.activeId = null;
    history.replaceState(null, '', location.pathname);
    closeSheet();
    animateTransform(0, 0, 1, 0.7);
  }


  function wireControls() {
    const resetBtn = $('#resetBtn'); if (resetBtn) resetBtn.addEventListener('click', resetView);
    const closeSheetBtn = $('#closeSheetBtn'); if (closeSheetBtn) closeSheetBtn.addEventListener('click', closeSheet);
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
      exploreBtn.addEventListener('click', () => {
        const gallery = document.querySelector('.gallery');
        if (gallery) gallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
    const shareButton = document.getElementById('shareBtn');
    if (shareButton) shareButton.addEventListener('click', async () => {
      const shareUrl = location.href;
      const shareData = { title: document.title, text: 'Explore We Design Beirut creators', url: shareUrl };
      if (navigator.share) {
        try { await navigator.share(shareData); } catch (_) { /* user cancelled */ }
      } else {
        try {
          await navigator.clipboard.writeText(shareUrl);
          shareButton.classList.add('copied');
          setTimeout(() => shareButton.classList.remove('copied'), 1000);
        } catch (_) {}
      }
    });

    // About and contact links now go to separate pages - no modal needed

    // Lightbox controls
    const lbClose = document.getElementById('lightboxClose');
    const lbPrev = document.getElementById('lightboxPrev');
    const lbNext = document.getElementById('lightboxNext');
    const lbFlip = document.getElementById('lightboxFlip');
    const lbCard = document.getElementById('lightboxCard');
    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lbPrev) lbPrev.addEventListener('click', () => stepLightbox(-1));
    if (lbNext) lbNext.addEventListener('click', () => stepLightbox(1));
    if (lbFlip && lbCard) lbFlip.addEventListener('click', () => {
      lbCard.classList.toggle('flip');
      if (hasGSAP && !prefersReducedMotion) {
        const back = document.getElementById('lightboxBack');
        gsap.fromTo(back, { opacity: 0, rotateY: -8 }, { opacity: 1, rotateY: 0, duration: 0.45, ease: 'power2.out' });
      }
    });
    document.addEventListener('keydown', (e) => { 
      if (e.key === 'Escape') {
        const lb = document.getElementById('lightbox');
        if (lb && lb.getAttribute('aria-hidden') === 'false') {
          closeLightbox();
        }
      }
      if (e.key === 'ArrowLeft') stepLightbox(-1); 
      if (e.key === 'ArrowRight') stepLightbox(1); 
    });

    // Basic drag to pan (map mode only)
    const stage = $('.stage');
    if (!stage) return;
    stage.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      if (e.target && e.target.closest && e.target.closest('.hotspot')) {
        // Do not start drag or capture when pressing a hotspot button
        return;
      }
      state.dragging = true;
      stage.setPointerCapture(e.pointerId);
      state.dragStart.x = e.clientX;
      state.dragStart.y = e.clientY;
      state.transformStart.x = state.transform.x;
      state.transformStart.y = state.transform.y;
      state.touches.set(e.pointerId, { clientX: e.clientX, clientY: e.clientY });
      if (state.touches.size === 2) {
        const [t1, t2] = Array.from(state.touches.values());
        state.pinchStart = {
          distance: distance(t1, t2),
          scale: state.transform.scale,
          midpoint: midpoint(t1, t2)
        };
      }
    });
    stage.addEventListener('pointermove', (e) => {
      if (!state.dragging) return;
      // update tracked touch
      if (state.touches.has(e.pointerId)) {
        state.touches.set(e.pointerId, { clientX: e.clientX, clientY: e.clientY });
      }

      if (state.touches.size >= 2 && state.pinchStart) {
        const [a, b] = Array.from(state.touches.values());
        const currentDist = distance(a, b);
        if (state.pinchStart.distance > 0) {
          const scaleFactor = currentDist / state.pinchStart.distance;
          const nextScale = clamp(state.pinchStart.scale * scaleFactor, 1, 2.4);

          // Zoom around midpoint by translating towards it
          const rect = state.hotspotsEl.getBoundingClientRect();
          const px = state.pinchStart.midpoint.x - rect.left;
          const py = state.pinchStart.midpoint.y - rect.top;
          const stageCenterX = rect.width / 2;
          const stageCenterY = rect.height / 2;
          const dx = stageCenterX - px;
          const dy = stageCenterY - py;
          const k = (nextScale - state.transform.scale) * 0.8; // dampen translation
          setSceneTransform(state.transformStart.x + dx * k, state.transformStart.y + dy * k, nextScale);
          return;
        }
      }

      // single-finger pan
      const dx = e.clientX - state.dragStart.x;
      const dy = e.clientY - state.dragStart.y;
      setSceneTransform(state.transformStart.x + dx, state.transformStart.y + dy, state.transform.scale);
    });
    const endDrag = (e) => {
      state.dragging = false;
      if (e && state.touches.has(e.pointerId)) state.touches.delete(e.pointerId);
      if (state.touches.size < 2) state.pinchStart = null;
    };
    stage.addEventListener('pointerup', endDrag);
    stage.addEventListener('pointercancel', endDrag);
    stage.addEventListener('pointerleave', endDrag);

    // Wheel zoom (desktop trackpad/mouse)
    stage.addEventListener('wheel', (e) => {
      if (!e.ctrlKey && Math.abs(e.deltaY) < 10) return; // require intent
      e.preventDefault();
      const rect = state.hotspotsEl.getBoundingClientRect();
      const px = clamp(e.clientX - rect.left, 0, rect.width);
      const py = clamp(e.clientY - rect.top, 0, rect.height);
      const direction = e.deltaY > 0 ? -1 : 1;
      const nextScale = clamp(state.transform.scale + direction * 0.15, 1, 2.4);
      focusOn(px, py, nextScale, { openSheet: false });
    }, { passive: false });

    // Double-tap / double-click to zoom in toward point
    let lastTap = 0;
    stage.addEventListener('click', (e) => {
      const now = Date.now();
      if (now - lastTap < 350) {
        const rect = state.hotspotsEl.getBoundingClientRect();
        const px = e.clientX - rect.left;
        const py = e.clientY - rect.top;
        const nextScale = clamp(state.transform.scale + 0.3, 1, 2);
        focusOn(px, py, nextScale, { openSheet: false });
      }
      lastTap = now;
    });
  }

  function stepCreator(dir) {
    if (!state.activeId) return;
    const idx = state.creators.findIndex(c => c.id === state.activeId);
    if (idx < 0) return;
    const next = (idx + dir + state.creators.length) % state.creators.length;
    const target = state.creators[next];
    state.activeId = target.id;
    const rect = state.hotspotsEl.getBoundingClientRect();
    const px = (target.x / 100) * rect.width;
    const py = (target.y / 100) * rect.height;
    focusOn(px, py, 1.6, { openSheet: false });
    updateSheet(target);
    history.replaceState(null, '', `#${target.slug || slugify(target.name)}`);
  }

  function tryOpenFromHash() {
    const slug = (location.hash || '').replace('#', '').trim();
    if (!slug) return;
    const c = state.creators.find((x) => (x.slug || slugify(x.name)) === slug);
    if (c) openCreator(c.id);
  }

  // Interactive mesh canvas for immersive hero
  function initMeshCanvas() {
    const canvas = document.getElementById('meshCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    function drawMesh() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const time = Date.now() * 0.001;
      const cols = 20;
      const rows = 15;
      const cellWidth = canvas.width / cols;
      const cellHeight = canvas.height / rows;
      
      ctx.strokeStyle = `rgba(124, 247, 198, ${0.1 + Math.sin(time) * 0.05})`;
      ctx.lineWidth = 1;
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * cellWidth;
          const y = j * cellHeight;
          
          const offsetX = Math.sin(time + i * 0.1) * 10;
          const offsetY = Math.cos(time + j * 0.1) * 10;
          
          ctx.beginPath();
          ctx.moveTo(x + offsetX, y + offsetY);
          ctx.lineTo(x + cellWidth + offsetX, y + offsetY);
          ctx.lineTo(x + cellWidth + offsetX, y + cellHeight + offsetY);
          ctx.stroke();
        }
      }
      
      animationId = requestAnimationFrame(drawMesh);
    }
    
    resizeCanvas();
    drawMesh();
    
    window.addEventListener('resize', () => {
      resizeCanvas();
    });
  }

  // Handle direct links from QR codes
  function tryOpenFromHash() {
    const hash = window.location.hash.substring(1); // Remove the #
    if (!hash || !state.galleryItems.length) return;
    
    console.log('Trying to open from hash:', hash);
    
    // Find the creator by slug
    const index = state.galleryItems.findIndex(item => {
      const creator = item.creator;
      if (!creator) return false;
      const slug = creator.slug || slugify(creator.name);
      return slug === hash;
    });
    
    if (index >= 0) {
      console.log('Found creator at index:', index);
      setTimeout(() => openLightbox(index), 500); // Small delay to ensure DOM is ready
    }
  }

  async function init() {
    wireControls();
    await loadCreators();
    buildGallery();
    initMeshCanvas();
    
    // Check if there's a hash in the URL (for QR code links)
    tryOpenFromHash();
    
    // Listen for hash changes
    window.addEventListener('hashchange', () => {
      const lb = document.getElementById('lightbox');
      if (!lb || lb.getAttribute('aria-hidden') !== 'false') {
        tryOpenFromHash();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();


