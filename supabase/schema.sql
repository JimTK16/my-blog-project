-- 1. Clean up (Be careful: this deletes existing posts!)
DROP TABLE IF EXISTS posts;

-- 2. Create a function to set the updated_at timestamp
-- This is a reusable "Backend" logic piece in Postgres
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 3. Create the table with the new column
CREATE TABLE posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    card_image_url TEXT,
    likes_count INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now() -- Initialized at creation
);

-- 4. Create the Trigger
-- This tells Postgres: "Right before an UPDATE happens, run our function"
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON posts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- 5. Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 6. Re-apply Policies
CREATE POLICY "Public can view published posts"
ON posts FOR SELECT
USING (is_published = true);

CREATE POLICY "Admins have full access"
ON posts FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);