-- Create the post table
CREATE TABLE posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    card_image_url TEXT,
    likes_count INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read published posts
CREATE POLICY "Public can view published posts"
ON posts FOR SELECT
USING (is_published = true);

-- Allow authenticated users to do everything
CREATE POLICY "Admins have full access"
ON posts FOR ALL
TO authenticated
USING (true);