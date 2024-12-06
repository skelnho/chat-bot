This is a Chatbot created with Nextjs.

## Features

- [Next.js](https://nextjs.org/) App Router
- [AI SDK](https://sdk.vercel.ai/docs)
- Data Persistence with [Prisma and Sqlite](https://www.prisma.io/docs/getting-started/quickstart-sqlite)
- [NextAuth.js with Google Oauth](https://next-auth.js.org/providers/google)
- Syntax Highlighting from Responses using [react-syntax-highlighter](https://www.npmjs.com/package/react-syntax-highlighter)
- [Zustand](https://github.com/pmndrs/zustand) for global state

## Getting Started

First, run the development server:

```bash
npm run setup
```

Make sure the following .env variables are set in .env.local:
OPENAI_API_KEY,
AUTH_SECRET,
AUTH_GOOGLE_ID,
AUTH_GOOGLE_SECRET

## Architectural Decision Record

This outlines the key architectural decisions made for our project and the reasoning behind each choice.

## Database ORM: Prisma

### Decision

I chose Prisma as our ORM (Object-Relational Mapping) solution.

### Rationale

- Type-safe database queries with automatic TypeScript type generation
- Excellent developer experience with auto-completion and inline error detection
- Schema migrations that are version controlled and repeatable
- Strong integration with Next.js and the TypeScript ecosystem

### Trade-offs

- Learning curve for developers new to Prisma's syntax
- Additional build step for generating Prisma Client
- Potential over-abstraction for very simple database operations

## Database: SQLite

### Decision

SQLite was selected as the primary database.

### Rationale

- Zero-configuration database that works out of the box
- File-based storage eliminates need for separate database server
- Perfect for development of toy applications 

### Trade-offs

- Limited concurrent write operations
- Not suitable for distributed systems
- Lacks some advanced features available in client-server databases

## Authentication: NextAuth.js

### Decision

NextAuth.js was chosen for handling authentication.

### Rationale

- Built specifically for Next.js applications
- Supports multiple authentication providers out of the box
- Handles session management automatically
- Built-in security best practices
- TypeScript support and type safety
- Middleware-based route protection
- Easy integration with Prisma

### Trade-offs

- Some advanced customization requires deeper understanding
- Session-based auth might not be ideal for all use cases
- Additional complexity compared to simpler auth solutions

## AI Integration: AI npm package

### Decision

I chose the AI npm package for integrating AI capabilities.

### Rationale

- Official package maintained by Vercel
- Streamlined integration with popular AI models
- Built-in streaming support
- TypeScript support

### Trade-offs

- May include features we don't need
- Could be overkill for simple AI integrations

## State Management: Zustand

### Decision

Zustand was selected for global state management.

### Rationale

- Minimal boilerplate compared to Redux
- Excellent TypeScript support
- Small bundle size (~1KB)
- No need for context providers
- Simple learning curve
- Built-in devtools support

### Trade-offs

- Less established than Redux
- Fewer middleware options
- May need additional solutions for very complex state

## Testing Framework: Vitest

### Decision

Vitest was chosen as our unit testing framework.

### Rationale

- Native TypeScript support
- Significantly faster than Jest
- Compatible with Jest's API (easy migration)
- Built-in coverage reporting
- Watch mode with instant feedback

### Trade-offs

- Newer than Jest (less community resources)
- Some Jest plugins might not work
- Team might need to learn new configurations

## Future Considerations

### Scalability

- Monitor SQLite performance and prepare for potential PostgreSQL migration
- Evaluate state management needs as application grows
- Consider breaking down into microservices if needed

### Monitoring

- Implement logging and monitoring solutions
- Set up error tracking
- Monitor AI API usage and costs

### Testing

- Implement E2E testing with Playwright or Cypress
- Set up continuous integration pipeline
- Establish code coverage targets

## Quick Demo
### Unauthenticated Chat with attachment
![Attachment](https://github.com/skelnho/chat-bot/blob/main/demo-attachment.gif)
![Session](https://github.com/skelnho/chat-bot/blob/main/demo-session.gif)

## Upcoming Features

- Responsive UI
- Amazon S3 storage for attachments
- Containerization and Production Deployment
- Switch to Tailwind for styling
