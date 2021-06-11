create VIEW getFollowed
AS
SELECT * FROM Followers
inner join Users on followed_userId = userId