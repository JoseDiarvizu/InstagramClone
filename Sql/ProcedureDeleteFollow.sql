create procedure DeleteFollow
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
			
			delete from Followers where followed_userId = @followedUserId and followerId = @followerUserId

		commit

	end try

	begin catch

		rollback
		set @error = 1

	end catch
end