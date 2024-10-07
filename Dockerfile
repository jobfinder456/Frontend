# Install dependencies only when needed
FROM node:latest AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Rebuild the source code only when needed
FROM node:latest AS builder
WORKDIR /app

# Pass the build arguments (these will come from GitHub Actions or your build context)
ARG NEXT_PUBLIC_BACK_AUTH
ARG NEXT_PUBLIC_BACK_MAIN
ARG NEXT_PUBLIC_RAZORPAY_KEY_ID

# Set them as environment variables for build time
ENV NEXT_PUBLIC_BACK_AUTH=${NEXT_PUBLIC_BACK_AUTH}
ENV NEXT_PUBLIC_BACK_MAIN=${NEXT_PUBLIC_BACK_MAIN}
ENV NEXT_PUBLIC_RAZORPAY_KEY_ID=${NEXT_PUBLIC_RAZORPAY_KEY_ID}

COPY . . 
COPY --from=deps /app/node_modules ./node_modules

# Ensure the build picks up the environment variables
RUN npm run build

# Production image, copy all the files and run next
FROM node:latest AS runner
WORKDIR /app

# Set environment variables for runtime
ENV NODE_ENV=production
ENV NEXT_PUBLIC_BACK_AUTH=${NEXT_PUBLIC_BACK_AUTH}
ENV NEXT_PUBLIC_BACK_MAIN=${NEXT_PUBLIC_BACK_MAIN}
ENV NEXT_PUBLIC_RAZORPAY_KEY_ID=${NEXT_PUBLIC_RAZORPAY_KEY_ID}

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/src/app/robots.txt ./public/robots.txt

EXPOSE 3000

CMD ["npm", "start"]
