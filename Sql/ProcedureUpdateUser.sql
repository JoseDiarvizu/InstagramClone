create procedure UpdateUser
(
	@name nvarchar(100),
	@username nvarchar(100),
	@password nvarchar(50),
	@email nvarchar(100),
	@biography nvarchar(255),
	@phone nvarchar(10),
	@is_public bit,
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
		set @message = 'There is not a user with that username.'
		return
	end

	begin try
		
		begin tran
			
			update Users set
			name = @name,password = @password,email = @email,biography = @biography,phone = @phone,is_public = @is_public
			where username = @username

		commit

	end try

	begin catch

		rollback
		set @error = 1
		set @message = 'There was a problem with the system, please contact an administrator.'

	end catch

end
