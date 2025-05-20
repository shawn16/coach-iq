#!/bin/bash

# Update npm itself
npm install -g npm@latest

# Update non-breaking dependencies
npm install \
  @auth/prisma-adapter@latest \
  @hookform/resolvers@latest \
  @radix-ui/react-alert-dialog@latest \
  @radix-ui/react-avatar@latest \
  @radix-ui/react-checkbox@latest \
  @radix-ui/react-dialog@latest \
  @radix-ui/react-dropdown-menu@latest \
  @radix-ui/react-label@latest \
  @radix-ui/react-popover@latest \
  @radix-ui/react-scroll-area@latest \
  @radix-ui/react-select@latest \
  @radix-ui/react-separator@latest \
  @radix-ui/react-slot@latest \
  @radix-ui/react-tabs@latest \
  @radix-ui/react-tooltip@latest \
  @radix-ui/react-visually-hidden@latest \
  @supabase/ssr@latest \
  @supabase/supabase-js@latest \
  class-variance-authority@latest \
  clsx@latest \
  date-fns@latest \
  geist@latest \
  lucide-react@latest \
  next-themes@latest \
  pg@latest \
  react-day-picker@latest \
  react-hook-form@latest \
  react-select@latest \
  sonner@latest \
  tailwind-merge@latest \
  tailwindcss-animate@latest \
  tw-animate-css@latest \
  zod@latest

# Update dev dependencies
npm install --save-dev \
  @eslint/eslintrc@latest \
  @tailwindcss/postcss@latest \
  @types/bcryptjs@latest \
  @types/node@20 \
  @types/react@18 \
  @types/react-dom@18 \
  eslint@8.56.0 \
  eslint-config-next@14 \
  shadcn@latest \
  shadcn-ui@latest \
  tailwindcss@3.4.1 \
  ts-node@latest \
  typescript@latest

# Update Prisma and related packages
npm install @prisma/client@5 prisma@5

# Generate Prisma client
npx prisma generate

# Fix any potential vulnerabilities
npm audit fix --force

echo "Dependencies updated successfully!"
