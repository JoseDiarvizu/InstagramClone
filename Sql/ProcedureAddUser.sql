alter procedure AddUser
(
	@name nvarchar(100),
	@username nvarchar(100),
	@password nvarchar(max),
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

	if(exists(select username from users where username=@username))
	begin
		set @error = 1
		set @message = 'There already exists a user with that username.'
		return
	end

	if(exists(select email from users where email=@email))
	begin
		set @error = 1
		set @message = 'There already exists an account with that email.'
		return
	end

	if(len(@phone)!=10)
	begin
		set @error = 1
		set @message = 'The phone number does not have 10 digits.'
		return
	end

	begin try
		
		begin tran
			
			insert into Users
			values
			(@name,@username,@password,@email,@biography,@phone,@is_public)


		commit

	end try

	begin catch

		rollback
		set @error = 1
		set @message = 'There was a problem with the system, please contact an administrator.'

	end catch

end
