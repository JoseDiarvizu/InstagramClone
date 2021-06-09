create procedure DeleteUser
(
	@username nvarchar(100),
	@error bit out,
	@message nvarchar(100) out
)
as
begin
	set @error = 0
	set @message = 'Procedure executed successfully'

	if(not exists(select username from users where username=@username))
	begin
		set @error = 1
		set @message = 'That username does not exist.'
		return
	end

	begin try
		
		begin tran
			
			delete from Users where username = @username

		commit

	end try

	begin catch

		rollback
		set @error = 1
		set @message = 'There was a problem with the system, please contact an administrator.'

	end catch

end
