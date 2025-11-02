-- Check current password hash in database
USE pucci_opulence;

SELECT 
    email, 
    password_hash,
    CASE 
        WHEN password_hash = '75K3eLr+dx6JJFuJ7LwIpEpOFmwGZZkRiB84PURz6U8=' THEN 'CORRECT'
        ELSE 'WRONG - NEEDS UPDATE'
    END AS status
FROM users 
WHERE email = 'john.doe@example.com';
