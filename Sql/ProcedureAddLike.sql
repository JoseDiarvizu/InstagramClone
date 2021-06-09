create procedure AddLike
(
	@userId int,
	@postId int,
	@error bit out
)
as
begin 
	set @error = 0
	begin try

		begin tran

			insert into Likes
			values
			(@userId,@postId)

		commit

	end try

	begin catch

	rollback
	set @error = 1

	end catch

end
