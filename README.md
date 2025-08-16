# AI Meeting Summarizer

An AI-powered application that transforms meeting transcripts into actionable summaries with customizable prompts and email sharing capabilities.

## Features

- 📄 **File Upload & Text Input**: Upload .txt files or paste meeting transcripts directly
- 🤖 **AI-Powered Summarization**: Uses Groq's Llama models for intelligent summarization
- ✏️ **Custom Prompts**: Customize how your summaries are generated
- 📝 **Editable Summaries**: Review and edit AI-generated content before sharing
- 📧 **Email Sharing**: Share summaries via email (demo implementation included)
- 🎨 **Modern UI**: Clean, professional interface with emerald theme
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **AI Integration**: Groq API with AI SDK
- **Typography**: Geist Sans & Geist Mono fonts
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn package manager
- Groq API key (get one at [console.groq.com](https://console.groq.com))

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd ai-meeting-summarizer
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   
   Edit `.env` and add your API keys:
   \`\`\`env
   GROQ_API_KEY=your_groq_api_key_here
   RESEND_API_KEY=your_resend_api_key_here  # Optional for email functionality
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Deployment

### Deploy to Render

1. **Connect your GitHub repository to Render**
   - Go to [render.com](https://render.com) and sign up/login
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository

2. **Configure the service**
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Node Version**: 18 or higher

3. **Set environment variables** in Render dashboard:
   - Go to your service settings
   - Add environment variables:
     - `GROQ_API_KEY`: Your Groq API key
     - `RESEND_API_KEY`: Your Resend API key (optional)

4. **Deploy**
   - Render will automatically build and deploy your application
   - Your app will be available at `https://your-app-name.onrender.com`

### Deploy to Vercel (Alternative)

1. **Connect to Vercel**
   \`\`\`bash
   npx vercel
   \`\`\`

2. **Set environment variables** in Vercel dashboard

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GROQ_API_KEY` | Groq API key for AI summarization | Yes |
| `RESEND_API_KEY` | Resend API key for email functionality | No |
| `NEXT_PUBLIC_APP_URL` | Application URL for production | No |

## Usage

1. **Upload or Paste Transcript**: Upload a .txt file or paste your meeting transcript
2. **Customize Instructions**: Modify the prompt to get summaries in your preferred format
3. **Generate Summary**: Click "Generate Summary" to create an AI-powered summary
4. **Edit & Review**: Review and edit the generated summary as needed
5. **Share via Email**: Enter recipient emails and send the summary

## API Routes

- `POST /api/summarize` - Generate AI summary from transcript
- `POST /api/send-email` - Send summary via email (demo implementation)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.
\`\`\`

```typescriptreact file="netlify.toml" isDeleted="true"
...deleted...
# Assignment-20
