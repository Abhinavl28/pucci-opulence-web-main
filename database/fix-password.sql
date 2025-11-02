-- Fix password hash for all users
USE pucci_opulence;

UPDATE users 
SET password_hash = '75K3eLr+dx6JJFuJ7LwIpEpOFmwGZZkRiB84PURz6U8=' 
WHERE email IN (
    'john.doe@example.com',
    'jane.smith@example.com',
    'michael.j@example.com',
    'emily.davis@example.com',
    'david.w@example.com'
);

-- Verify the update
SELECT 
    email, 
    'password123' AS password,
    password_hash
FROM users 
ORDER BY id;
