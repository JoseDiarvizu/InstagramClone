create procedure AddFollow
(
	@followerUserId int,
	@followedUserId int,
	@error bit out
)
as
begin
	set @error = 0

	begin try
		
		begin tran
			
			insert into Followers
			(followed_userId,followerId)
			values
			(@followedUserId,@followerUserId)

		commit

	end try

	begin catch

		rollback
		set @error = 1

	end catch
end