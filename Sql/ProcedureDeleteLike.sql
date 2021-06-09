create procedure DeleteLike
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

			delete from Likes where postId=@postId and userId=@userId

		commit

	end try

	begin catch

	rollback
	set @error = 1

	end catch

end
