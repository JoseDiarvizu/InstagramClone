create view friendsPosts
as
select postId,userID,creation_date,post_image from Posts
join Followers on followerId = posts.userID