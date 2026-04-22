import { LOGO_B64 } from './logoBase64';

// Public Earth image
const EARTH_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/The_Blue_Marble_%28remastered%29.jpg/600px-The_Blue_Marble_%28remastered%29.jpg';

// Background images via GitHub raw (works in email img tags)
const BASE = 'https://raw.githubusercontent.com/shrixtacy/EarthDay/main/public/assets/images';
const bgImages: Record<string, string> = {
  sky:    `${BASE}/sky.webp`,
  ocean:  `${BASE}/ocean.webp`,
  forest: `${BASE}/forest.webp`,
  space:  `${BASE}/space.webp`,
  soil:   `${BASE}/soil.webp`,
};

// Load logo as base64 at runtime (server-side only, lazy)
let cachedLogo: string | null = null;
const getLogoBase64 = () => {
  if (cachedLogo) return cachedLogo;
  cachedLogo = LOGO_B64;
  return cachedLogo;
};

const facts = [
  "🌊 The ocean produces over 50% of the world's oxygen — more than all the rainforests combined.",
  "🌳 A single mature tree can absorb up to 48 pounds of CO₂ per year.",
  "🐋 Blue whales are the largest animals ever known — their hearts are the size of a small car.",
  "💧 Only 3% of Earth's water is fresh — two-thirds of that is locked in glaciers.",
  "🦁 Lions have declined by 90% in the last century. Less than 25,000 remain in the wild.",
  "🌿 Forests are home to 80% of all terrestrial species on Earth.",
  "🐠 Coral reefs support 25% of all marine life despite covering less than 1% of the ocean floor.",
  "🌍 Every year, 15 billion trees are cut down — only 5 billion are replanted.",
  "🐘 Elephants can recognize themselves in mirrors — one of only a few species with self-awareness.",
  "💨 One tree can cool the surrounding air by up to 10°F through evapotranspiration.",
];

const dramaticAddresses = [
  "You Are The Chosen One",
  "You Are Destined For Greatness",
  "The Earth Has Called Upon You",
  "A Guardian Has Awakened",
  "The Planet Chose You",
];

const getRandomFacts = (count: number) =>
  [...facts].sort(() => Math.random() - 0.5).slice(0, count);

const getRandomAddress = () =>
  dramaticAddresses[Math.floor(Math.random() * dramaticAddresses.length)];

const buildEmail = (
  name: string,
  pledge: string,
  bgImage: string,
  earthImage: string,
  accentColor: string,
  bodyText: string,
  closingText: string,
  factCount: number,
  logoSrc: string
) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Our Planet — Earth Day 2026</title>
</head>
<body style="margin:0;padding:0;font-family:Georgia,serif;">

  <!-- OUTER TABLE - background attribute works in all email clients -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0"
    background="${bgImage}"
    style="background-color:#111111;background-image:url('${bgImage}');background-size:cover;background-position:center;">
    <tr>
      <td align="center" style="padding:24px 12px 40px;background-color:rgba(0,0,0,0.55);">

        <!-- INNER CARD max 580px -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0"
          style="max-width:580px;width:100%;border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.6);">

          <!-- ===== BLACK HEADER ===== -->
          <tr>
            <td style="background:#000000;padding:32px 28px 0;text-align:center;">
              <p style="margin:0 0 8px;color:${accentColor};font-family:Arial,sans-serif;font-size:10px;letter-spacing:5px;text-transform:uppercase;">An Initiative by Elixios</p>
              <h1 style="margin:0;color:#f5f5f0;font-size:48px;font-weight:900;letter-spacing:-2px;line-height:1;font-family:Georgia,serif;">Our Planet</h1>
              <p style="margin:8px 0 0;color:rgba(245,245,240,0.4);font-family:Arial,sans-serif;font-size:10px;letter-spacing:4px;text-transform:uppercase;">Earth Day 2026</p>
              <!-- Earth PNG peeking from bottom - only top half visible -->
              <div style="overflow:hidden;height:100px;margin-top:16px;">
                <img src="${earthImage}" alt="Earth" width="300"
                  style="display:block;margin:0 auto;width:300px;max-width:85%;margin-top:-30px;"/>
              </div>
            </td>
          </tr>

          <!-- ===== WHITE BODY ===== -->
          <tr>
            <td style="background:#ffffff;padding:40px 32px 32px;">

              <!-- Dramatic address -->
              <p style="margin:0 0 4px;color:${accentColor};font-family:Arial,sans-serif;font-size:10px;letter-spacing:5px;text-transform:uppercase;text-align:center;">Dear Pledge Keeper,</p>
              <h2 style="margin:0 0 4px;color:#1a1a1d;font-size:26px;font-weight:900;text-align:center;line-height:1.2;font-family:Georgia,serif;">${getRandomAddress()},</h2>
              <h3 style="margin:0 0 28px;color:#1a1a1d;font-size:18px;font-weight:400;text-align:center;font-family:Georgia,serif;">${name}.</h3>

              <hr style="border:none;border-top:1px solid #ebebeb;margin:0 0 24px;"/>

              <p style="margin:0 0 18px;color:#1a1a1d;font-size:15px;line-height:1.8;">${bodyText}</p>

              <!-- Pledge box -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;">
                <tr>
                  <td style="background:#f8f8f6;border-left:4px solid ${accentColor};border-radius:0 8px 8px 0;padding:16px 20px;">
                    <p style="margin:0 0 6px;color:#999;font-family:Arial,sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;">Your Pledge</p>
                    <p style="margin:0;color:#1a1a1d;font-size:15px;line-height:1.7;font-style:italic;">"${pledge}"</p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 24px;color:#1a1a1d;font-size:15px;line-height:1.8;">
                By taking this pledge, you have committed to planting and nurturing
                <strong>at least 10 trees every single year.</strong>
                Not just planting — but watching them grow, watering them, protecting them.
                A tree planted and forgotten is a promise broken.
              </p>

              <hr style="border:none;border-top:1px solid #ebebeb;margin:0 0 20px;"/>

              <!-- Facts -->
              <p style="margin:0 0 14px;color:#1a1a1d;font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:4px;text-transform:uppercase;">Did You Know?</p>
              ${getRandomFacts(factCount).map(f => `<p style="margin:0 0 10px;color:#333;font-size:14px;line-height:1.7;">${f}</p>`).join('')}

              <hr style="border:none;border-top:1px solid #ebebeb;margin:20px 0;"/>

              <p style="margin:0;color:#1a1a1d;font-size:14px;line-height:1.8;">${closingText}</p>

            </td>
          </tr>

          <!-- ===== FOOTER ===== -->
          <tr>
            <td style="background:#0a0a0a;padding:32px 28px;text-align:center;border-radius:0 0 20px 20px;">
              <p style="margin:0 0 14px;color:rgba(245,245,240,0.4);font-family:Arial,sans-serif;font-size:10px;letter-spacing:4px;text-transform:uppercase;">An Initiative by</p>

              <!-- Logo + ELIXIOS -->
              <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto 20px;">
                <tr>
                  <td style="vertical-align:middle;">
                    <span style="color:#f5f5f0;font-family:Georgia,serif;font-size:30px;font-weight:900;letter-spacing:3px;">ELIXIOS</span>
                  </td>
                </tr>
              </table>

              <!-- Social icons row -->
              <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto 20px;">
                <tr>
                  <!-- Instagram -->
                  <td style="padding:0 10px;">
                    <a href="https://www.instagram.com/elixios.in/" target="_blank" style="text-decoration:none;">
                      <img src="https://cdn-icons-png.flaticon.com/32/1384/1384063.png" width="28" height="28" alt="Instagram" style="display:block;filter:invert(1);"/>
                    </a>
                  </td>
                  <!-- LinkedIn -->
                  <td style="padding:0 10px;">
                    <a href="https://www.linkedin.com/company/elixios-labs/" target="_blank" style="text-decoration:none;">
                      <img src="https://cdn-icons-png.flaticon.com/32/1384/1384014.png" width="28" height="28" alt="LinkedIn" style="display:block;filter:invert(1);"/>
                    </a>
                  </td>
                  <!-- Website -->
                  <td style="padding:0 10px;">
                    <a href="https://www.elixios.in" target="_blank" style="text-decoration:none;">
                      <img src="https://cdn-icons-png.flaticon.com/32/1006/1006771.png" width="28" height="28" alt="Website" style="display:block;filter:invert(1);"/>
                    </a>
                  </td>
                  <!-- Email -->
                  <td style="padding:0 10px;">
                    <a href="mailto:elixios.info@gmail.com" style="text-decoration:none;">
                      <img src="https://cdn-icons-png.flaticon.com/32/732/732200.png" width="28" height="28" alt="Email" style="display:block;filter:invert(1);"/>
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;color:rgba(245,245,240,0.25);font-family:Arial,sans-serif;font-size:11px;">© 2026 · For the Planet · By the People</p>
            </td>
          </tr>

        </table>
        <!-- end inner card -->

      </td>
    </tr>
  </table>

</body>
</html>`;

const templateConfigs = [
  { bg: 'sky', accent: '#87CEEB', body: `Look up. The sky you see today exists because billions of trees breathed life into it. You have chosen to be part of that story. Your name is now written in the wind, carried across every ocean, every forest, every mountain on this pale blue dot.`, closing: `<strong>Elixios</strong> is not a company with shareholders. We are friends, strangers, and dreamers who believe the most radical act in 2026 is to simply give a damn about the Earth. This is serious. This is fun. This is both. Welcome to the family.`, facts: 3 },
  { bg: 'ocean', accent: '#00CED1', body: `The waves have whispered your name. The deep blue has recorded your promise. From this day forward, you are not just a person — you are a guardian of this living, breathing world. The ocean, which covers 71% of this planet, salutes you.`, closing: `<strong>Elixios</strong> — we are not saving the world. We are a group of people who refuse to pretend everything is fine. We are serious, but we are also hopeful. Because hope, like a tree, needs to be planted before it can grow.`, facts: 4 },
  { bg: 'forest', accent: '#90EE90', body: `The ancient trees have stood for centuries, waiting for someone like you. Today, you answered. The roots of the forest tremble with gratitude. You are now part of something older than civilization itself — the unbroken chain of life on Earth.`, closing: `<strong>Elixios</strong> — a name, a feeling, a movement. Not a brand. Just people who love this planet enough to do something about it. You are one of us now. The forest knows your name.`, facts: 5 },
  { bg: 'space', accent: '#9b8fa6', body: `In the vast silence of the cosmos, there is one pale blue dot that holds everything we have ever loved. You have chosen to protect it. In the grand scale of the universe, that single act of care is everything. The stars are watching.`, closing: `<strong>Elixios</strong> — we looked at the stars and came back to plant trees. We are individuals, not a corporation. We are serious, but we are also full of wonder. Because wonder is what makes us protect the things we love.`, facts: 4 },
  { bg: 'soil', accent: '#D2691E', body: `Beneath your feet lies the foundation of all life. The soil remembers every seed ever planted, every root that ever reached down in faith. You have made a vow to this Earth — and the Earth does not forget those who keep their promises.`, closing: `<strong>Elixios</strong> is a group of individuals who care for our nature — not as a company, but as human beings who understand that the ground beneath us is not just dirt. It is the source of everything. Protect it. Honour it. Love it.`, facts: 3 },
];

export const getRandomTemplate = (name: string, pledge: string): string => {
  const t = templateConfigs[Math.floor(Math.random() * templateConfigs.length)];
  const logoSrc = getLogoBase64();
  const bgImage = bgImages[t.bg];
  const earthImage = EARTH_URL;

  return buildEmail(name, pledge, bgImage, earthImage, t.accent, t.body, t.closing, t.facts, logoSrc);
};
