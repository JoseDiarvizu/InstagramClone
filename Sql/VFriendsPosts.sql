alter view friendsPosts
as
select p.postId,p.userID,p.creation_date,p.post_image,f.followerId,u.username from Posts as p
join Followers as f
on p.userID=f.followed_userId
join Users as u
on p.userID=u.userId

select * from friendsPosts