# 🍄 Avatar Chat Integration Guide

**Quick guide to enable the avatar chat widget on your site**

---

## Step 1: Import the Component

Edit `src/components/Layout/index.tsx`:

```typescript
'use client';

import { ReactLenis } from '@studio-freight/react-lenis';
import StyledComponentsRegistry from '../../../libs/registry';
import { GlobalStyles } from './GlobalStyles';
import { Footer, Header, Preloader } from '..';
import { useState } from 'react';
import FloatingChatButton from '../UI/AvatarChat/FloatingChatButton'; // Add this line

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [complete, setComplete] = useState(false);
  return (
    <StyledComponentsRegistry>
      <ReactLenis
        root
        easing={(t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))}
      >
        <GlobalStyles />
        <Preloader setComplete={setComplete} />
        <div className={complete ? 'complete' : 'not_complete'}>
          <Header />
          {children}
          <Footer />
        </div>
        <FloatingChatButton /> {/* Add this line */}
      </ReactLenis>
    </StyledComponentsRegistry>
  );
};

export default Layout;
```

---

## Step 2: Configure Environment Variables

Make sure these are set in your `.env.local`:

```env
# Medusa backend URL (required for chat to work)
MEDUSA_BACKEND_URL=http://localhost:9000

# Avatar engine URL (optional - graceful fallback if not available)
CREW_GATEWAY_URL=http://localhost:8080
AVATAR_ENGINE_API_KEY=your_api_key_here
```

---

## Step 3: Start Medusa Backend

The chat widget needs the Medusa backend running:

```bash
# In a new terminal
cd backend/medusa
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run migrate
npm run dev
```

Medusa will start on http://localhost:9000

---

## Step 4: Start Next.js

```bash
# In project root
npm run dev
```

---

## Step 5: Test It

1. Visit http://localhost:3000
2. Look for the mushroom button 🍄 in the bottom-right corner
3. Click to open the chat
4. Send a test message

**Expected behavior**:
- If avatar engine is running: AI-powered response
- If avatar engine is NOT running: Fallback message

---

## Customization Options

### Change Avatar ID

Edit the FloatingChatButton component or pass a prop:

```typescript
<FloatingChatButton avatarId="custom-avatar-name" />
```

### Conditional Display

Only show on certain pages:

```typescript
import { usePathname } from 'next/navigation';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const showChat = pathname === '/' || pathname.startsWith('/resources');
  
  return (
    // ... rest of layout
    {showChat && <FloatingChatButton />}
  );
};
```

### Change Position

Edit `FloatingChatButton.tsx`:

```typescript
const FloatingButton = styled.button`
  position: fixed;
  bottom: 24px;  // Change these values
  right: 24px;   // Change these values
  // ... rest of styles
`;
```

---

## Troubleshooting

### Button doesn't appear
- Check console for errors
- Verify component is imported correctly
- Make sure it's outside the `<div className={complete ? ...}>` wrapper

### Chat doesn't work
- Check MEDUSA_BACKEND_URL is correct
- Verify Medusa is running on port 9000
- Open browser DevTools → Network tab to see API calls

### Styling issues
- Component uses styled-components
- Make sure StyledComponentsRegistry is wrapping everything
- Check for CSS conflicts

---

## Mobile Experience

The chat widget automatically:
- Displays full-screen on mobile (< 768px)
- Shows as modal on desktop
- Adjusts button size for touch targets
- Supports swipe gestures

---

## Accessibility

The widget includes:
- ARIA labels on all buttons
- Keyboard navigation (Tab, Enter, Esc)
- Screen reader support
- Focus management
- Color contrast compliance

---

## Analytics (Optional)

Track chat interactions by adding to your analytics:

```typescript
// In AvatarChat/index.tsx, add to sendMessage():
gtag('event', 'avatar_chat_message', {
  conversation_id: conversationId,
  message_length: input.length,
});
```

---

## Production Deployment

Before going live:

1. ✅ Deploy Medusa backend to production
2. ✅ Update MEDUSA_BACKEND_URL in Vercel
3. ✅ (Optional) Deploy avatar engine
4. ✅ Test on production domain
5. ✅ Monitor error logs
6. ✅ Set up analytics tracking

---

## Need Help?

- **Setup Issues**: See [MEDUSA-AVATAR-SETUP.md](./MEDUSA-AVATAR-SETUP.md)
- **Component Errors**: Check browser console
- **API Errors**: Check Medusa logs
- **Styling**: Review Sweet Psilocybe brand colors

---

**Quick Links**:
- [Full Setup Guide](./MEDUSA-AVATAR-SETUP.md)
- [Implementation Summary](./IMPLEMENTATION-SUMMARY.md)
- [Backend README](./backend/README.md)

---

*Integration time: ~5 minutes once backend is running*
