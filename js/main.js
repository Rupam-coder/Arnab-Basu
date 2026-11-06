/**
 * ARNAB BASU — CINEMATIC INTERACTIVE ENGINE (REVISION 4)
 * Light-dominant (off-white) with deep black typography.
 * Bright editorial. No blue, navy or warm tints.
 * Modules: Loader, Marquee Flow, Dust/Particle Canvas, Scroll Engine,
 * Hero Photo + Parallax, 3D Drum, Skills, Timeline, Field, Contact, Nav.
 */

(function () {
  'use strict';

  const DATA = window.PORTFOLIO_DATA;
  const CONFIG = window.CONFIG;

  if (!DATA) {
    console.error('PORTFOLIO_DATA not found.');
    return;
  }

  /* ==========================================================================
     1. PERFORMANCE & CAPABILITY DETECTION
     ========================================================================== */
  const perfState = {
    isLowPower: false,
    prefersReduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    isCoarsePointer: window.matchMedia('(pointer: coarse)').matches,
    scrollY: 0,
    lastScrollY: 0,
    scrollVelocity: 0,
    mouseX: window.innerWidth / 2,
    mouseY: window.innerHeight / 2,
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    isHeroVisible: true,
    isTabVisible: true
  };

  if (CONFIG.LOW_POWER && CONFIG.LOW_POWER.autoDetect) {
    var cores = navigator.hardwareConcurrency || 4;
    var memory = navigator.deviceMemory || 4;
    if (cores <= 4 || memory <= 2 || perfState.prefersReduced) {
      perfState.isLowPower = true;
    }
  }

  window.addEventListener('resize', function () {
    perfState.windowWidth = window.innerWidth;
    perfState.windowHeight = window.innerHeight;
    perfState.isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
  }, { passive: true });

  window.addEventListener('mousemove', function (e) {
    if (!perfState.isCoarsePointer) {
      perfState.mouseX = e.clientX;
      perfState.mouseY = e.clientY;
    }
  }, { passive: true });

  document.addEventListener('visibilitychange', function () {
    perfState.isTabVisible = !document.hidden;
  });

  /* ==========================================================================
     2. TOAST NOTIFICATION HELPER
     ========================================================================== */
  function showToast(msg) {
    var shelf = document.getElementById('toast-shelf');
    if (!shelf) return;
    var toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = msg;
    shelf.appendChild(toast);
    requestAnimationFrame(function () { toast.classList.add('show'); });
    setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () { toast.remove(); }, 250);
    }, 2600);
  }

  /* ==========================================================================
     3. LOADER & OPENING ANIMATION ("Arnab Basu" with kinetic load progress)
     ========================================================================== */
  function initLoader() {
    var curtain = document.getElementById('intro-curtain');
    var nameEl = document.getElementById('intro-title');
    var hairline = document.getElementById('intro-hairline');
    var badge = curtain ? curtain.querySelector('.intro-badge') : null;
    var progressBar = document.getElementById('intro-loader-progress');

    if (!curtain || !nameEl) return;

    var urlParams = new URLSearchParams(window.location.search);
    var forceReplay = urlParams.get(CONFIG.INTRO.forceReplayParam) === '1';
    var seen = sessionStorage.getItem('introSeen');

    if (seen && !forceReplay) {
      curtain.remove();
      document.body.classList.remove('scroll-locked');
      return;
    }

    document.body.classList.add('scroll-locked');

    if (perfState.prefersReduced) {
      curtain.style.transition = 'opacity 250ms ease';
      setTimeout(function () {
        curtain.style.opacity = '0';
        setTimeout(function () {
          curtain.remove();
          document.body.classList.remove('scroll-locked');
          sessionStorage.setItem('introSeen', 'true');
        }, 250);
      }, 350);
      return;
    }

    var rawText = DATA.person.name;
    nameEl.innerHTML = '';
    var charSpans = [];

    for (var i = 0; i < rawText.length; i++) {
      var char = rawText[i];
      var span = document.createElement('span');
      span.className = 'intro-char';
      if (char === ' ') {
        span.innerHTML = '&nbsp;';
        span.style.minWidth = '0.35em';
      } else {
        span.textContent = char;
      }
      nameEl.appendChild(span);
      charSpans.push(span);
    }

    var dismissed = false;
    var dismiss = function (speed) {
      if (dismissed) return;
      dismissed = true;
      sessionStorage.setItem('introSeen', 'true');
      curtain.classList.add('dismissed');
      setTimeout(function () {
        document.body.classList.remove('scroll-locked');
        curtain.remove();
      }, speed || 750);
    };

    curtain.addEventListener('click', function () { dismiss(300); });
    window.addEventListener('keydown', function () { dismiss(300); }, { once: true });

    // Animate badge in first
    setTimeout(function () {
      if (badge) badge.classList.add('visible');
    }, 120);

    // Stagger character entrance with spring ease
    charSpans.forEach(function (span, idx) {
      setTimeout(function () { span.classList.add('visible'); }, 200 + idx * 70);
    });

    // Animate glowing hairline
    setTimeout(function () {
      if (hairline) hairline.classList.add('drawn');
    }, 950);

    // Animate progress bar fill
    setTimeout(function () {
      if (progressBar) progressBar.classList.add('complete');
    }, 300);

    // Auto-dismiss once fonts are ready and animation finishes
    Promise.all([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      new Promise(function (res) { setTimeout(res, 2200); })
    ]).then(function () {
      dismiss(750);
    });
  }

  /* ==========================================================================
     4. FLOWING BACKGROUND MARQUEE ENGINE (outline text, scroll velocity)
     ========================================================================== */
  function initFlowingTypography() {
    var heroMarquee = document.getElementById('hero-marquee');
    var contactMarquee = document.getElementById('contact-marquee');

    if (!heroMarquee || perfState.prefersReduced) {
      // Reduced motion: show static single row, no movement
      return null;
    }

    var rows = heroMarquee.querySelectorAll('.marquee-row');
    var rowStates = [];

    rows.forEach(function (row) {
      var track = row.querySelector('.marquee-track');
      var direction = parseFloat(row.getAttribute('data-direction') || '1');
      var speedMult = parseFloat(row.getAttribute('data-speed') || '1');
      var halfWidth = track ? track.scrollWidth / 2 : 2000;

      rowStates.push({
        track: track,
        offset: 0,
        direction: direction,
        speedMult: speedMult,
        halfWidth: halfWidth
      });
    });

    var contactTrack = null;
    var contactOffset = 0;
    var contactHalfWidth = 2000;
    if (contactMarquee) {
      contactTrack = contactMarquee.querySelector('.marquee-track');
      if (contactTrack) {
        contactHalfWidth = contactTrack.scrollWidth / 2;
      }
    }

    // Pause when offscreen
    var heroObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        perfState.isHeroVisible = e.isIntersecting;
      });
    }, { threshold: 0.05 });
    heroObserver.observe(heroMarquee);

    var baseSpeed = (CONFIG.MARQUEE && CONFIG.MARQUEE.baseSpeed) ? CONFIG.MARQUEE.baseSpeed : 38;

    return function updateMarquees(dt) {
      if (!perfState.isTabVisible) return;

      if (perfState.isHeroVisible) {
        rowStates.forEach(function (rs) {
          if (!rs.track) return;
          var velInfluence = perfState.scrollVelocity * 2.4 * rs.speedMult;
          var effectiveSpeed = (rs.direction * baseSpeed * rs.speedMult) + velInfluence;
          rs.offset -= effectiveSpeed * dt;

          if (rs.offset <= -rs.halfWidth) rs.offset += rs.halfWidth;
          else if (rs.offset >= 0) rs.offset -= rs.halfWidth;

          rs.track.style.transform = 'translate3d(' + rs.offset + 'px, 0, 0)';
        });
      }

      if (contactTrack) {
        contactOffset -= baseSpeed * 0.45 * dt;
        if (contactOffset <= -contactHalfWidth) contactOffset += contactHalfWidth;
        contactTrack.style.transform = 'translate3d(' + contactOffset + 'px, 0, 0)';
      }
    };
  }

  /* ==========================================================================
     5. LIGHT-SECTION DUST & DARK-SECTION STAR CANVAS
     ========================================================================== */
  function initParticleCanvas() {
    var canvas = document.getElementById('starfield-canvas');
    if (!canvas || !CONFIG.STARFIELD || !CONFIG.STARFIELD.enabled) return null;
    var ctx = canvas.getContext('2d');
    if (!ctx) return null;

    var dpr = Math.min(window.devicePixelRatio || 1, CONFIG.STARFIELD.maxDpr || 2);
    var W = 0, H = 0;

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Fewer, smaller particles for the light editorial look
    var dustCount = perfState.isLowPower
      ? 10
      : (perfState.windowWidth < 768 ? 15 : (CONFIG.STARFIELD.dustCount || 30));

    var particles = [];
    for (var i = 0; i < dustCount; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        radius: Math.random() * 0.9 + 0.3,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        alpha: Math.random() * 0.18 + 0.06,
        // Will be colored based on current section (light vs dark)
        dark: Math.random() > 0.5
      });
    }

    // Detect section scheme at given scroll position
    function isOverDarkSection() {
      // Sample the element at the vertical midpoint of the screen
      var midY = window.innerHeight / 2;
      var el = document.elementFromPoint(window.innerWidth / 2, midY);
      if (!el) return false;
      var section = el.closest && el.closest('section');
      if (section && section.classList.contains('dark-section')) return true;
      return false;
    }

    var darkMode = false;
    var darkModeCheckTimer = 0;

    return function renderParticles(dt) {
      if (!perfState.isTabVisible || perfState.isLowPower) return;
      ctx.clearRect(0, 0, W, H);

      // Check dark mode every ~0.5s to avoid per-frame DOM queries
      darkModeCheckTimer += dt;
      if (darkModeCheckTimer > 0.5) {
        darkModeCheckTimer = 0;
        darkMode = isOverDarkSection();
      }

      var particleColor = '2,132,199'; // Aquatic blue ambient particles

      particles.forEach(function (p) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = 'rgb(' + particleColor + ')';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
    };
  }

  /* ==========================================================================
     6. HERO PHOTO: LOAD TEST, PARALLAX & FLOAT ENGINE
     ========================================================================== */
  function initHeroPhoto() {
    var heroSection = document.getElementById('hero');
    var photoStage = document.getElementById('hero-photo-stage');
    var photoMain = document.getElementById('hero-photo-main');

    if (!photoStage) return null;

    if (heroSection) heroSection.classList.add('has-cutout');

    // Ensure image failsafe
    if (photoMain) {
      photoMain.addEventListener('error', function () {
        if (photoMain.src.indexOf('arnab-cutout.png') !== -1) {
          photoMain.src = 'Arnab.png';
        } else {
          photoStage.classList.add('photo-failed');
        }
      });
    }

    var floatTime = 0;
    var currentTiltX = 0;
    var currentTiltY = 0;
    var targetTiltX = 0;
    var targetTiltY = 0;
    var scrollProgress = 0;

    return function updateHeroPhoto(dt) {
      if (!perfState.isHeroVisible || perfState.prefersReduced) return;

      floatTime += dt;

      // Slow float: small sine bob (vertical only, very subtle)
      var floatY = Math.sin(floatTime * 0.55) * 7;

      // Mouse parallax (desktop only)
      if (!perfState.isCoarsePointer) {
        var normX = (perfState.mouseX / perfState.windowWidth) - 0.5;
        var normY = (perfState.mouseY / perfState.windowHeight) - 0.5;
        targetTiltX = normY * -3;
        targetTiltY = normX * 4;
      } else {
        targetTiltX = 0;
        targetTiltY = 0;
      }

      currentTiltX += (targetTiltX - currentTiltX) * 0.07;
      currentTiltY += (targetTiltY - currentTiltY) * 0.07;

      // Scroll: portrait rises and fades as user scrolls into About
      scrollProgress = Math.min(1, Math.max(0, perfState.scrollY / (perfState.windowHeight * 0.75 || 600)));
      var scrollYOffset = scrollProgress * -60;
      var scrollOpacity = Math.max(0, 1 - scrollProgress * 0.9);

      // Apply to stage
      photoStage.style.transform =
        'translate3d(' + (currentTiltY * 3) + 'px, ' + (floatY + scrollYOffset) + 'px, 0)' +
        ' rotateX(' + currentTiltX + 'deg) rotateY(' + currentTiltY + 'deg)';
      photoStage.style.opacity = scrollOpacity;

      // Shadow layer moves opposite (parallax depth)
      var shadowEl = photoStage.querySelector('.hero-photo-shadow');
      if (shadowEl) {
        shadowEl.style.transform =
          'translate3d(' + (-currentTiltY * 5) + 'px, ' + (-currentTiltX * 4 + floatY * 0.4) + 'px, 0)' +
          ' scale(1.05)';
      }
    };
  }

  /* ==========================================================================
     7. HERO HEADLINE SCROLL PARALLAX & SCALE
     ========================================================================== */
  function initHeroHeadline() {
    var headlineWrap = document.querySelector('.hero-headline-wrap');
    var copyBlock = document.querySelector('.hero-copy-block');
    var actions = document.querySelector('.hero-actions');

    if (!headlineWrap) return null;

    return function updateHeadline() {
      if (perfState.prefersReduced) return;
      var progress = Math.min(1, Math.max(0, perfState.scrollY / (perfState.windowHeight * 0.6 || 500)));
      // Headline scales down and fades as user scrolls
      var scale = 1 - progress * 0.08;
      var opacity = Math.max(0, 1 - progress * 1.2);
      headlineWrap.style.transform = 'scale(' + scale + ')';
      headlineWrap.style.opacity = opacity;
    };
  }

  /* ==========================================================================
     8. HEADER SCHEME SWITCHER (light/dark based on current section)
     ========================================================================== */
  function initHeaderSchemeSwitcher() {
    var header = document.getElementById('site-header');
    if (!header) return;

    var darkSections = document.querySelectorAll('section.dark-section');
    if (!darkSections.length) return;

    var observer = new IntersectionObserver(function (entries) {
      var anyDark = false;
      darkSections.forEach(function (sec) {
        var rect = sec.getBoundingClientRect();
        // If the top of a dark section is within the top ~25% of viewport
        if (rect.top <= window.innerHeight * 0.25 && rect.bottom > 0) {
          anyDark = true;
        }
      });
      if (anyDark) {
        header.classList.add('header-dark');
      } else {
        header.classList.remove('header-dark');
      }
    }, { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] });

    darkSections.forEach(function (sec) { observer.observe(sec); });

    // Also update on scroll for precision
    window.addEventListener('scroll', function () {
      var anyDark = false;
      darkSections.forEach(function (sec) {
        var rect = sec.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.2 && rect.bottom > 0) {
          anyDark = true;
        }
      });
      if (anyDark) {
        header.classList.add('header-dark');
      } else {
        header.classList.remove('header-dark');
      }
    }, { passive: true });
  }

  /* ==========================================================================
     9. SHARED rAF ENGINE
     ========================================================================== */
  function initSharedRafEngine(updateMarquees, renderParticles, updateHeroPhoto, updateHeadline) {
    var progressLine = document.getElementById('scroll-progress-line');
    var timelineFill = document.getElementById('timeline-svg-fill');
    var expSection = document.getElementById('experience');

    var lastTime = performance.now();

    function loop(now) {
      var dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Scroll tracking
      perfState.scrollY = window.scrollY || document.documentElement.scrollTop;
      var rawVelocity = perfState.scrollY - perfState.lastScrollY;
      perfState.lastScrollY = perfState.scrollY;
      perfState.scrollVelocity += (rawVelocity - perfState.scrollVelocity) * 0.22;

      // Scroll progress line
      if (progressLine) {
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var pct = docHeight > 0 ? (perfState.scrollY / docHeight) * 100 : 0;
        progressLine.style.width = pct + '%';
      }

      // Timeline fill animation
      if (expSection && timelineFill) {
        var rect = expSection.getBoundingClientRect();
        var winH = window.innerHeight;
        if (rect.top < winH * 0.7 && rect.bottom > 0) {
          var dist = (winH * 0.7) - rect.top;
          var p = Math.min(100, Math.max(0, (dist / rect.height) * 100));
          timelineFill.style.height = p + '%';

          expSection.querySelectorAll('.timeline-node').forEach(function (node) {
            var nRect = node.getBoundingClientRect();
            if (nRect.top < winH * 0.65) {
              node.classList.add('active');
            } else {
              node.classList.remove('active');
            }
          });
        }
      }

      // In the Field center brightening
      var fieldLines = document.querySelectorAll('.field-line');
      var midY = window.innerHeight / 2;
      fieldLines.forEach(function (line) {
        var r = line.getBoundingClientRect();
        if (r.top < midY + 110 && r.bottom > midY - 110) {
          line.classList.add('active');
        } else {
          line.classList.remove('active');
        }
      });

      // Run modules
      if (renderParticles) renderParticles(dt);
      if (updateMarquees) updateMarquees(dt);
      if (updateHeroPhoto) updateHeroPhoto(dt);
      if (updateHeadline) updateHeadline();

      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
  }

  /* ==========================================================================
     10. ABOUT SECTION: METRICS & DOMAINS
     ========================================================================== */
  function initAboutSection() {
    var domainsContainer = document.getElementById('about-domains-cloud');
    if (domainsContainer) {
      domainsContainer.innerHTML = DATA.researchAreas.map(function (area) {
        return '<span class="about-domain-chip">' + area + '</span>';
      }).join('');
    }

    var impactContainer = document.getElementById('impact-strip-container');
    if (impactContainer) {
      var pubs = DATA.publications;
      var metrics = [
        { label: 'Journal Articles', count: pubs.filter(function (p) { return p.category === 'journal'; }).length },
        { label: 'Book Chapters', count: pubs.filter(function (p) { return p.category === 'chapter'; }).length },
        { label: 'Conference Proceedings', count: pubs.filter(function (p) { return p.category === 'conference'; }).length },
        { label: 'Books & IP', count: pubs.filter(function (p) { return p.category === 'ip'; }).length },
        { label: 'Certifications', count: DATA.certifications.length }
      ];

      impactContainer.innerHTML = metrics.map(function (m) {
        return '<div class="impact-metric"><span class="impact-value" data-target="' + m.count + '">0</span><span class="impact-desc">' + m.label + '</span></div>';
      }).join('');

      var countObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var valEl = entry.target.querySelector('.impact-value');
            if (valEl) {
              var target = parseInt(valEl.getAttribute('data-target'), 10);
              animateCounter(valEl, target);
            }
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });

      impactContainer.querySelectorAll('.impact-metric').forEach(function (el) {
        countObserver.observe(el);
      });
    }
  }

  function animateCounter(el, target) {
    if (perfState.prefersReduced) { el.textContent = target; return; }
    var current = 0;
    var duration = 1100;
    var step = target / (duration / 25);
    var timer = setInterval(function () {
      current += step;
      if (current >= target) {
        clearInterval(timer);
        el.textContent = target;
      } else {
        el.textContent = Math.floor(current);
      }
    }, 25);
  }

  /* ==========================================================================
     11. PUBLICATIONS: 3D CYLINDRICAL DRUM CAROUSEL
     ========================================================================== */
  function initDrumCarousel() {
    var stage = document.getElementById('drum-stage');
    var drum = document.getElementById('drum-carousel');
    var counterEl = document.getElementById('drum-counter');
    var prevBtn = document.getElementById('drum-prev');
    var nextBtn = document.getElementById('drum-next');
    var fallbackList = document.getElementById('drum-fallback-list');
    var filterButtons = document.querySelectorAll('.drum-filter-btn');

    if (!drum || !stage) return;

    var activeFilter = 'all';
    var currentRotation = 0;
    var targetRotation = 0;
    var isDragging = false;
    var startX = 0;
    var startRotation = 0;
    var velocity = 0;
    var lastX = 0;
    var filteredPubs = [];
    var anglePerCard = 0;
    var cardRadius = 0;
    var activeIndex = 0;

    function renderDrum() {
      filteredPubs = activeFilter === 'all'
        ? DATA.publications
        : DATA.publications.filter(function (p) { return p.category === activeFilter; });

      var n = filteredPubs.length;
      drum.innerHTML = '';
      if (fallbackList) fallbackList.innerHTML = '';

      if (n === 0) {
        drum.innerHTML = '<div style="color:var(--muted-dark,#8C8C8C); text-align:center; padding:3rem; font-family:var(--font-mono);">No publications found.</div>';
        return;
      }

      var cardWidth = Math.min(290, window.innerWidth * 0.72);
      anglePerCard = 360 / Math.max(n, 6);
      cardRadius = Math.round((cardWidth / 2) / Math.tan(Math.PI / Math.max(n, 6)));
      cardRadius = Math.max(300, Math.min(cardRadius, 540));

      filteredPubs.forEach(function (pub, i) {
        var cardAngle = i * anglePerCard;
        var card = document.createElement('article');
        card.className = 'drum-card' + (i === 0 ? ' active' : '');
        card.setAttribute('data-index', i);
        card.style.transform = 'rotateY(' + cardAngle + 'deg) translateZ(' + cardRadius + 'px)';

        card.innerHTML =
          '<div class="drum-card-top">' +
            '<span>' + pub.type + '</span>' +
            '<span>' + pub.year + '</span>' +
          '</div>' +
          '<div class="drum-card-cover">' + pub.abstractCover + '</div>' +
          '<div>' +
            '<h3 class="drum-card-title">' + pub.title + '</h3>' +
            '<p class="drum-card-venue">' + pub.venue + '</p>' +
          '</div>' +
          '<div class="drum-card-bottom">' +
            '<span class="drum-card-indexing">' + pub.indexing + '</span>' +
            '<span class="drum-card-action">Details →</span>' +
          '</div>';

        (function (pubRef, iRef) {
          card.addEventListener('click', function () {
            if (Math.abs(velocity) > 0.4) return;
            if (activeIndex === iRef) {
              openDetailModal(pubRef);
            } else {
              rotateToIndex(iRef);
            }
          });
        }(pub, i));

        drum.appendChild(card);

        if (fallbackList) {
          var fbCard = document.createElement('div');
          fbCard.className = 'fallback-card';
          fbCard.innerHTML =
            '<div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:0.7rem;color:var(--text-dark,#F2F2F0);margin-bottom:0.5rem;">' +
              '<span>' + pub.type + '</span><span>' + pub.year + '</span>' +
            '</div>' +
            '<h3 style="font-family:var(--font-display);font-size:1.1rem;font-weight:800;color:var(--text-dark,#F2F2F0);margin-bottom:0.4rem;">' + pub.title + '</h3>' +
            '<p style="font-family:var(--font-body);font-size:0.85rem;color:var(--muted-dark,#8C8C8C);margin-bottom:0.5rem;">' + pub.venue + '</p>' +
            '<span style="font-family:var(--font-mono);font-size:0.7rem;color:var(--text-dark,#F2F2F0);">' + pub.indexing + ' · View Details →</span>';
          (function (pubRef2) {
            fbCard.addEventListener('click', function () { openDetailModal(pubRef2); });
          }(pub));
          fallbackList.appendChild(fbCard);
        }
      });

      targetRotation = 0;
      currentRotation = 0;
      updateActiveCard();
    }

    function rotateToIndex(index) {
      var n = filteredPubs.length;
      if (n === 0) return;
      targetRotation = -index * anglePerCard;
    }

    function updateActiveCard() {
      var n = filteredPubs.length;
      if (n === 0) return;
      var normalized = ((-targetRotation % 360) + 360) % 360;
      activeIndex = Math.round(normalized / anglePerCard) % n;

      drum.querySelectorAll('.drum-card').forEach(function (c, idx) {
        var diff = Math.abs(idx - activeIndex);
        if (diff > n / 2) diff = n - diff;

        if (idx === activeIndex) {
          c.classList.add('active');
          c.style.opacity = '1';
        } else {
          c.classList.remove('active');
          var op = Math.max(0.12, 1 - (diff * 0.32));
          c.style.opacity = String(op);
        }
      });

      if (counterEl) {
        counterEl.textContent =
          String(activeIndex + 1).padStart(2, '0') + ' / ' + String(n).padStart(2, '0');
      }
    }

    // Pointer Events (supports drag & touch)
    stage.addEventListener('pointerdown', function (e) {
      isDragging = true;
      startX = e.clientX;
      lastX = e.clientX;
      startRotation = targetRotation;
      velocity = 0;
      stage.setPointerCapture(e.pointerId);
    });

    stage.addEventListener('pointermove', function (e) {
      if (!isDragging) return;
      var deltaX = e.clientX - startX;
      velocity = (e.clientX - lastX) * 0.5 + velocity * 0.5;
      lastX = e.clientX;
      targetRotation = startRotation + deltaX * (CONFIG.CAROUSEL.dragSensitivity || 0.22);
    });

    function endDrag() {
      if (!isDragging) return;
      isDragging = false;
      targetRotation += velocity * 2.2;
      var step = anglePerCard;
      targetRotation = Math.round(targetRotation / step) * step;
      updateActiveCard();
    }

    stage.addEventListener('pointerup', endDrag);
    stage.addEventListener('pointercancel', endDrag);

    stage.addEventListener('wheel', function (e) {
      e.preventDefault();
      var delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      targetRotation -= delta * 0.22;
      targetRotation = Math.round(targetRotation / anglePerCard) * anglePerCard;
      updateActiveCard();
    }, { passive: false });

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        targetRotation += anglePerCard;
        updateActiveCard();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        targetRotation -= anglePerCard;
        updateActiveCard();
      });
    }

    window.addEventListener('keydown', function (e) {
      var rect = stage.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        if (e.key === 'ArrowLeft') { targetRotation += anglePerCard; updateActiveCard(); }
        else if (e.key === 'ArrowRight') { targetRotation -= anglePerCard; updateActiveCard(); }
      }
    });

    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        activeFilter = btn.getAttribute('data-filter');
        renderDrum();
      });
    });

    function updateDrum() {
      if (!perfState.prefersReduced) {
        currentRotation += (targetRotation - currentRotation) * 0.085;
        drum.style.transform = 'rotateY(' + currentRotation + 'deg)';
      } else {
        drum.style.transform = 'rotateY(' + targetRotation + 'deg)';
      }
      requestAnimationFrame(updateDrum);
    }
    requestAnimationFrame(updateDrum);

    renderDrum();
  }

  /* ==========================================================================
     12. DETAIL MODAL DIALOG
     ========================================================================== */
  function openDetailModal(pub) {
    var modal = document.getElementById('pub-modal');
    if (!modal) return;

    document.getElementById('modal-title').textContent = pub.title;
    document.getElementById('modal-venue').textContent =
      pub.venue + (pub.publisher ? ' · ' + pub.publisher : '');
    document.getElementById('modal-indexing').textContent = pub.indexing;
    document.getElementById('modal-authors').textContent = 'Authors: ' + pub.authors;

    var citationText =
      pub.authors + ' (' + pub.year + '). ' + pub.title + '. ' + pub.venue +
      (pub.publisher ? ' · ' + pub.publisher : '') + '.';

    var copyBtn = document.getElementById('modal-copy-btn');
    if (copyBtn) {
      copyBtn.onclick = function () {
        navigator.clipboard.writeText(citationText).then(function () {
          showToast('Citation copied in APA format');
        }).catch(function () {
          showToast('Citation: ' + citationText);
        });
      };
    }

    var extLink = document.getElementById('modal-link');
    if (extLink) {
      if (pub.links && pub.links.length > 0) {
        extLink.href = pub.links[0].url;
        extLink.style.display = 'inline-flex';
        extLink.textContent = pub.links[0].label || 'View Link';
      } else {
        extLink.style.display = 'none';
      }
    }

    modal.showModal();
    document.body.classList.add('scroll-locked');

    var closeBtn = document.getElementById('modal-close-btn');
    var handleClose = function () {
      modal.close();
      document.body.classList.remove('scroll-locked');
    };
    if (closeBtn) closeBtn.onclick = handleClose;
    modal.onclick = function (e) {
      if (e.target === modal) handleClose();
    };
  }

  /* ==========================================================================
     13. SKILLS, TIMELINE, FIELD
     ========================================================================== */
  function initSkills() {
    var container = document.getElementById('skills-stream-container');
    if (!container) return;

    container.innerHTML = DATA.skillsData.map(function (item) {
      return '<div class="skill-stream-item">' +
        '<h3 class="skill-huge-title">' + item.category + '</h3>' +
        '<div class="skill-cluster">' +
          item.subItems.map(function (sub) {
            return '<span class="skill-tag">' + sub + '</span>';
          }).join('') +
        '</div>' +
      '</div>';
    }).join('');
  }

  function initTimeline() {
    var expContainer = document.getElementById('experience-nodes-container');
    if (expContainer) {
      expContainer.innerHTML = DATA.experience.map(function (exp) {
        return '<div class="timeline-node">' +
          '<div class="timeline-dot" aria-hidden="true"></div>' +
          '<div class="timeline-card">' +
            '<span class="timeline-period">' + exp.period + '</span>' +
            '<h3 class="timeline-role">' + exp.role + '</h3>' +
            '<p class="timeline-inst">' + exp.institution + ' (' + exp.type + ')</p>' +
            '<p class="timeline-desc">' + exp.details + '</p>' +
            '<span class="timeline-tag-pill">' + exp.tag + '</span>' +
          '</div>' +
        '</div>';
      }).join('');
    }

    var eduContainer = document.getElementById('education-monogram-list');
    if (eduContainer) {
      eduContainer.innerHTML = DATA.education.map(function (edu) {
        var initials = edu.institution.split(' ').map(function (w) { return w[0]; }).join('').slice(0, 3);
        return '<div class="monogram-card">' +
          '<div class="monogram-box">' + initials + '</div>' +
          '<div class="monogram-content">' +
            '<span class="timeline-period">' + edu.period + '</span>' +
            '<h4 class="monogram-title">' + edu.degree + '</h4>' +
            '<p class="monogram-sub">' + edu.institution + '</p>' +
            '<p class="monogram-sub" style="margin-top:4px;">' + edu.notes + '</p>' +
          '</div>' +
        '</div>';
      }).join('');
    }

    var certContainer = document.getElementById('certifications-monogram-list');
    if (certContainer) {
      certContainer.innerHTML = DATA.certifications.map(function (cert) {
        var initials = cert.issuer.slice(0, 2).toUpperCase();
        return '<div class="monogram-card">' +
          '<div class="monogram-box">' + initials + '</div>' +
          '<div class="monogram-content">' +
            '<h4 class="monogram-title">' + cert.name + '</h4>' +
            '<p class="monogram-sub">' + cert.issuer + '</p>' +
          '</div>' +
        '</div>';
      }).join('');
    }
  }

  function initFieldStrip() {
    var container = document.getElementById('field-strip-container');
    if (!container) return;

    container.innerHTML = DATA.fieldHighlights.map(function (h) {
      return '<div class="field-line">' +
        '<span class="field-num">' + h.index + '</span>' +
        '<div>' +
          '<h3 class="field-title">' + h.title + '</h3>' +
          '<p class="field-org">' + h.organization + '</p>' +
        '</div>' +
        '<div>' +
          '<p class="field-quote">"' + h.quote + '"</p>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  /* ==========================================================================
     14. CONTACT (No form, secure assembly)
     ========================================================================== */
  function initContact() {
    var p = DATA.person;
    var emailFull = p.emailUser + '@' + p.emailHost;
    var phoneFull = p.phoneCountry + ' ' + p.phoneArea + ' ' + p.phoneNum;
    var phoneClean = p.phoneCountry + p.phoneArea + p.phoneNum;

    var emailBtn = document.getElementById('contact-email-btn');
    var phoneBtn = document.getElementById('contact-phone-btn');
    var linkedInBtn = document.getElementById('contact-linkedin-btn');
    var writePrimaryBtn = document.getElementById('write-to-me-btn');

    // Sweep-fill coordinates for btn-primary
    [emailBtn, phoneBtn, linkedInBtn, writePrimaryBtn].forEach(function (btn) {
      if (!btn) return;
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        btn.style.setProperty('--cursor-x', (e.clientX - rect.left) + 'px');
        btn.style.setProperty('--cursor-y', (e.clientY - rect.top) + 'px');
      });
    });

    if (emailBtn) {
      emailBtn.onclick = function () {
        navigator.clipboard.writeText(emailFull).then(function () {
          showToast('Email address copied to clipboard');
        }).catch(function () {
          showToast('Email: ' + emailFull);
        });
        setTimeout(function () {
          window.location.href = 'mailto:' + emailFull;
        }, 300);
      };
    }

    if (writePrimaryBtn) {
      writePrimaryBtn.onclick = function () {
        window.location.href = 'mailto:' + emailFull + '?subject=' +
          encodeURIComponent('Academic Inquiry / Research Collaboration');
      };
    }

    if (phoneBtn) {
      phoneBtn.onclick = function () {
        window.location.href = 'tel:' + phoneClean;
      };
    }

    if (linkedInBtn) {
      linkedInBtn.onclick = function () {
        window.open(p.linkedIn, '_blank', 'noopener,noreferrer');
      };
    }
  }

  /* ==========================================================================
     15. NAVIGATION & SCROLL-SPY
     ========================================================================== */
  function initNavigation() {
    var navLinks = document.querySelectorAll('.nav-link');
    var mobileLinks = document.querySelectorAll('.mobile-nav-link');
    var menuBtn = document.getElementById('mobile-menu-btn');
    var mobileOverlay = document.getElementById('mobile-overlay');
    var sections = document.querySelectorAll('section[id]');

    if (menuBtn && mobileOverlay) {
      menuBtn.onclick = function () {
        var isOpen = mobileOverlay.classList.toggle('open');
        menuBtn.querySelector('span').textContent = isOpen ? 'CLOSE' : 'MENU';
        menuBtn.setAttribute('aria-expanded', isOpen);
        document.body.classList.toggle('scroll-locked', isOpen);
      };

      mobileLinks.forEach(function (link) {
        link.onclick = function () {
          mobileOverlay.classList.remove('open');
          menuBtn.querySelector('span').textContent = 'MENU';
          menuBtn.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('scroll-locked');
        };
      });
    }

    var clearNav = function () {
      navLinks.forEach(function (l) { l.classList.remove('active'); });
      mobileLinks.forEach(function (l) { l.classList.remove('active'); });
    };

    var spyObserver = new IntersectionObserver(function (entries) {
      var scrollY = window.scrollY || document.documentElement.scrollTop;
      if (scrollY < 260) { clearNav(); return; }

      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          if (id === 'hero') { clearNav(); return; }
          navLinks.forEach(function (l) {
            if (l.getAttribute('href') === '#' + id) {
              clearNav();
              l.classList.add('active');
            }
          });
          mobileLinks.forEach(function (l) {
            if (l.getAttribute('href') === '#' + id) {
              clearNav();
              l.classList.add('active');
            }
          });
        }
      });
    }, { threshold: 0.25, rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(function (s) { spyObserver.observe(s); });

    var yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    var backBtn = document.getElementById('back-to-top');
    if (backBtn) {
      backBtn.onclick = function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    }
  }

  /* ==========================================================================
     16. BOOTSTRAP
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', function () {
    var updateMarquees = null;
    var renderParticles = null;
    var updateHeroPhoto = null;
    var updateHeadline = null;

    try { initLoader(); } catch (e) { console.error('Loader error:', e); }
    try { updateMarquees = initFlowingTypography(); } catch (e) { console.error('Marquee error:', e); }
    try { renderParticles = initParticleCanvas(); } catch (e) { console.error('Particles error:', e); }
    try { updateHeroPhoto = initHeroPhoto(); } catch (e) { console.error('Photo error:', e); }
    try { updateHeadline = initHeroHeadline(); } catch (e) { console.error('Headline error:', e); }
    try { initHeaderSchemeSwitcher(); } catch (e) { console.error('Header scheme error:', e); }
    try { initAboutSection(); } catch (e) { console.error('About error:', e); }
    try { initDrumCarousel(); } catch (e) { console.error('Drum error:', e); }
    try { initSkills(); } catch (e) { console.error('Skills error:', e); }
    try { initTimeline(); } catch (e) { console.error('Timeline error:', e); }
    try { initFieldStrip(); } catch (e) { console.error('Field error:', e); }
    try { initContact(); } catch (e) { console.error('Contact error:', e); }
    try { initNavigation(); } catch (e) { console.error('Nav error:', e); }

    try {
      initSharedRafEngine(updateMarquees, renderParticles, updateHeroPhoto, updateHeadline);
    } catch (e) {
      console.error('rAF Engine error:', e);
    }
  });

})();
