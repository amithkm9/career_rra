### ClassMent - Career Discovery & Roadmap Platform

## Overview

ClassMent is a comprehensive career guidance platform that helps users discover suitable career paths based on their skills, interests, and values. The platform provides personalized career roadmaps, role recommendations, and professional development services to guide users through their career journey.

## Tech Stack

- **Frontend**: Next.js 13+ (App Router), React 18+
- **Styling**: Tailwind CSS, shadcn/ui components
- **Authentication**: Supabase Auth (Email OTP, Google OAuth)
- **Database**: Supabase PostgreSQL
- **Storage**: Supabase Storage (for resume uploads)
- **Analytics**: OpenReplay for user behavior tracking
- **Payment Integration**: Razorpay (integration points)


## Key Features

### 1. Career Discovery

- Interactive questionnaire to gather user interests, skills, and values
- Resume/CV upload and analysis
- Personalized career path recommendations


### 2. Role Recommendations

- AI-powered role matching based on user profile
- Detailed role descriptions with personal and professional fit explanations
- Selection and saving of preferred career paths


### 3. Career Roadmaps

- Step-by-step guidance for career development
- Customized learning paths and skill development recommendations
- Progress tracking and milestone achievements


### 4. Premium Services

- Tiered service plans (Basic, Pro, Premium)
- Career coaching and consultation
- Resume optimization and interview preparation
- Industry networking opportunities


### 5. User Dashboard

- Centralized access to all platform features
- Progress tracking and next steps
- Quick access to services and roadmaps


## Setup Instructions

### Prerequisites

- Node.js 16.8+ and npm/yarn
- Supabase account
- OpenReplay account
- Razorpay account (for payment processing)


### Environment Variables

Create a `.env.local` file with the following variables:

```plaintext
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_OPENREPLAY_PROJECT_KEY=your_openreplay_project_key
```

### Installation

1. Clone the repository


```shellscript
git clone https://github.com/your-username/classment.git
cd classment
```

2. Install dependencies


```shellscript
npm install
# or
yarn install
```

3. Run the development server


```shellscript
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser


## Project Structure

```plaintext
/app                     # Next.js App Router pages
  /auth                  # Authentication related pages
  /dashboard             # User dashboard
  /discovery             # Career discovery process
  /paywall               # Premium features paywall
  /privacy-policy        # Legal pages
  /roadmap               # Career roadmap
  /roles                 # Role recommendations
  /services              # Premium services
/components              # React components
  /dashboard             # Dashboard components
  /discovery             # Discovery process components
  /paywall               # Paywall components
  /roles                 # Role recommendation components
  /roadmap               # Roadmap components
  /services              # Services components
  /ui                    # UI components (shadcn/ui)
/context                 # React context providers
/lib                     # Utility functions
  /supabase.ts           # Supabase client
  /openreplay.ts         # OpenReplay tracking utilities
  /utils.ts              # General utilities
/public                  # Static assets
```

## Analytics Implementation

The project uses OpenReplay for user behavior tracking and analytics. Key tracked events include:

1. **User Identification**

1. User ID tracking when users log in
2. Basic metadata about users

2. **Career Discovery Events**

1. CV uploads
2. Interest, skill, and value selections

3. **Role Selection Events**

1. Which roles users select
2. Time spent on role pages

4. **Roadmap Engagement**

1. Clicks on "Start My Roadmap" button
2. Roadmap completion rates

5. **Service Engagement**

1. Clicks on Services button from dashboard
2. Plan selection with metadata (plan name, price)
3. Payment initiation events


### Analytics Implementation Details

The OpenReplay tracking is implemented through:

1. **OpenReplay Provider** (`components/openreplay-provider.tsx`)

1. Initializes the tracker
2. Identifies users when they log in

2. **Tracking Utilities** (`lib/openreplay.ts`)

1. `initTracker()`: Initializes the OpenReplay tracker
2. `identifyUser()`: Sets user ID for session tracking
3. `setUserMetadata()`: Adds user metadata
4. `trackEvent()`: Tracks custom events with payload

3. **Key Tracked Events**

1. User login and identification
2. Role selection with metadata
3. CV uploads
4. Roadmap starts
5. Service plan selection with plan details


## Deployment

The project is configured for deployment on Vercel. To deploy:

1. Connect your GitHub repository to Vercel
2. Configure the environment variables in Vercel project settings
3. Deploy the project


## License

[MIT License](LICENSE)

## Contributors

- ClassMent Team

## Support

For support, email [teamclassment@gmail.com](mailto:teamclassment@gmail.com) or visit our website at [classment.com](https://classment.com).
