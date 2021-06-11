SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[getFollowers]
AS
SELECT * FROM Followers
inner join Users on followerId = userId


GO