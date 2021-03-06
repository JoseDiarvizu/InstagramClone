USE [master]
GO
/****** Object:  Database [Instagram]    Script Date: 07/06/2021 10:37:47 a. m. ******/
CREATE DATABASE [Instagram]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Instagram', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\Instagram.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Instagram_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\Instagram_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [Instagram] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Instagram].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Instagram] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Instagram] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Instagram] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Instagram] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Instagram] SET ARITHABORT OFF 
GO
ALTER DATABASE [Instagram] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [Instagram] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Instagram] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Instagram] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Instagram] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Instagram] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Instagram] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Instagram] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Instagram] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Instagram] SET  ENABLE_BROKER 
GO
ALTER DATABASE [Instagram] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Instagram] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Instagram] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Instagram] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Instagram] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Instagram] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Instagram] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Instagram] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [Instagram] SET  MULTI_USER 
GO
ALTER DATABASE [Instagram] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Instagram] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Instagram] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Instagram] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Instagram] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Instagram] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [Instagram] SET QUERY_STORE = OFF
GO
USE [Instagram]
GO
/****** Object:  User [InstagramMasterUser]    Script Date: 07/06/2021 10:37:48 a. m. ******/
CREATE USER [InstagramMasterUser] FOR LOGIN [InstagramMasterUser] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 07/06/2021 10:37:48 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[userId] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](30) NOT NULL,
	[username] [nvarchar](20) NULL,
	[password] [nvarchar](max) NOT NULL,
	[email] [nvarchar](30) NOT NULL,
	[biography] [nvarchar](255) NULL,
	[phone] [nvarchar](10) NULL,
	[is_public] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[userId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  View [dbo].[VUsers]    Script Date: 07/06/2021 10:37:48 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[VUsers]
as
select * from users
GO
/****** Object:  Table [dbo].[Posts]    Script Date: 07/06/2021 10:37:48 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Posts](
	[postId] [int] IDENTITY(1,1) NOT NULL,
	[userID] [int] NULL,
	[creation_date] [date] NOT NULL,
	[post_image] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[postId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  View [dbo].[userPosts]    Script Date: 07/06/2021 10:37:48 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[userPosts]
as
select * from Posts
GO
/****** Object:  Table [dbo].[Likes]    Script Date: 07/06/2021 10:37:48 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Likes](
	[likeId] [int] IDENTITY(1,1) NOT NULL,
	[userID] [int] NULL,
	[postID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[likeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[VLikes]    Script Date: 07/06/2021 10:37:48 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create View [dbo].[VLikes]
as select * from Likes
GO
/****** Object:  Table [dbo].[Followers]    Script Date: 07/06/2021 10:37:48 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Followers](
	[followId] [int] IDENTITY(1,1) NOT NULL,
	[followed_userId] [int] NULL,
	[followerId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[followId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[VFollowers]    Script Date: 07/06/2021 10:37:48 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[VFollowers]
as
select * from Followers
GO
/****** Object:  View [dbo].[friendsPosts]    Script Date: 07/06/2021 10:37:48 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[friendsPosts]
as
select postId,userID,creation_date,post_image from Posts
join Followers on followerId = posts.userID
GO
/****** Object:  Table [dbo].[Comments]    Script Date: 07/06/2021 10:37:48 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comments](
	[commentId] [int] IDENTITY(1,1) NOT NULL,
	[userID] [int] NULL,
	[postID] [int] NULL,
	[content] [text] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[commentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Messages]    Script Date: 07/06/2021 10:37:48 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Messages](
	[messageId] [int] IDENTITY(1,1) NOT NULL,
	[sender_userId] [int] NULL,
	[addressee_userId] [int] NULL,
	[mssg] [text] NOT NULL,
	[mssg_date] [date] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[messageId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[Messages] ADD  DEFAULT (getdate()) FOR [mssg_date]
GO
ALTER TABLE [dbo].[Posts] ADD  DEFAULT (getdate()) FOR [creation_date]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT ('foo name') FOR [name]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT ('123') FOR [password]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT ('hello@gmail.com') FOR [email]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT ((1)) FOR [is_public]
GO
ALTER TABLE [dbo].[Comments]  WITH CHECK ADD FOREIGN KEY([postID])
REFERENCES [dbo].[Posts] ([postId])
GO
ALTER TABLE [dbo].[Comments]  WITH CHECK ADD FOREIGN KEY([userID])
REFERENCES [dbo].[Users] ([userId])
GO
ALTER TABLE [dbo].[Followers]  WITH CHECK ADD FOREIGN KEY([followed_userId])
REFERENCES [dbo].[Users] ([userId])
GO
ALTER TABLE [dbo].[Followers]  WITH CHECK ADD FOREIGN KEY([followerId])
REFERENCES [dbo].[Users] ([userId])
GO
ALTER TABLE [dbo].[Likes]  WITH CHECK ADD FOREIGN KEY([postID])
REFERENCES [dbo].[Posts] ([postId])
GO
ALTER TABLE [dbo].[Likes]  WITH CHECK ADD FOREIGN KEY([userID])
REFERENCES [dbo].[Users] ([userId])
GO
ALTER TABLE [dbo].[Messages]  WITH CHECK ADD FOREIGN KEY([addressee_userId])
REFERENCES [dbo].[Users] ([userId])
GO
ALTER TABLE [dbo].[Messages]  WITH CHECK ADD FOREIGN KEY([sender_userId])
REFERENCES [dbo].[Users] ([userId])
GO
ALTER TABLE [dbo].[Posts]  WITH CHECK ADD FOREIGN KEY([userID])
REFERENCES [dbo].[Users] ([userId])
GO
/****** Object:  StoredProcedure [dbo].[AddFollow]    Script Date: 07/06/2021 10:37:48 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[AddFollow]
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
GO
/****** Object:  StoredProcedure [dbo].[AddLike]    Script Date: 07/06/2021 10:37:48 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[AddLike]
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
GO
/****** Object:  StoredProcedure [dbo].[AddUser]    Script Date: 07/06/2021 10:37:48 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[AddUser]
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
GO
/****** Object:  StoredProcedure [dbo].[createComment]    Script Date: 07/06/2021 10:37:48 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[createComment]
(
    @userId int,
    @postId int,
    @content NVARCHAR(max),
    @error bit out

)
as
BEGIN
set @error = 0
begin TRY
    begin TRAN
    insert into Comments (userID,postID,content) values (@userId,@postId,@content)
    COMMIT
end TRY
begin CATCH
    ROLLBACK
    set @error = 1
end CATCH
END


GO
/****** Object:  StoredProcedure [dbo].[createPost]    Script Date: 07/06/2021 10:37:48 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[createPost]
(
    @userId int,
    @postImage NVARCHAR(max),
    @error bit out

)
as
BEGIN
set @error = 0
begin TRY
    begin TRAN
    insert into Posts (userID,creation_date,post_image) values (@userId,GETDATE(),@postImage)
    COMMIT
end TRY
begin CATCH
    ROLLBACK
    set @error = 1
end CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[deleteComment]    Script Date: 07/06/2021 10:37:48 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[deleteComment]
(
    @commentId int,
    @error bit out

)
as
BEGIN
set @error = 0
begin TRY
    begin TRAN
    delete from Comments WHERE commentId = @commentId
    COMMIT
end TRY
begin CATCH
    ROLLBACK
    set @error = 1
end CATCH
END


GO
/****** Object:  StoredProcedure [dbo].[DeleteFollow]    Script Date: 07/06/2021 10:37:48 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[DeleteFollow]
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
GO
/****** Object:  StoredProcedure [dbo].[DeleteLike]    Script Date: 07/06/2021 10:37:48 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[DeleteLike]
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
GO
/****** Object:  StoredProcedure [dbo].[deletePost]    Script Date: 07/06/2021 10:37:48 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[deletePost]
(
    @postId int,
    @error bit out   
)
as
BEGIN
set @error = 0
begin TRY
    begin TRAN
    delete from Posts where postId = @postId
    COMMIT
end TRY
begin CATCH
    ROLLBACK
    set @error = 1
end CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[DeleteUser]    Script Date: 07/06/2021 10:37:48 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[DeleteUser]
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
GO
/****** Object:  StoredProcedure [dbo].[updateComment]    Script Date: 07/06/2021 10:37:48 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[updateComment]
(
    @commentId int,
    @content NVARCHAR(max),
    @error bit out

)
as
BEGIN
set @error = 0
begin TRY
    begin TRAN
    update Comments set content = @content where commentId = @commentId
    COMMIT
end TRY
begin CATCH
    ROLLBACK
    set @error = 1
end CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[updatePost]    Script Date: 07/06/2021 10:37:48 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[updatePost]
(
    @postId int,
    @postImage NVARCHAR(max),
    @error bit out

)
as
BEGIN
set @error = 0
begin TRY
    begin TRAN
    update posts set post_image = @postImage where postId = @postId
    COMMIT
end TRY
begin CATCH
    ROLLBACK
    set @error = 1
end CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateUser]    Script Date: 07/06/2021 10:37:48 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[UpdateUser]
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
GO
USE [master]
GO
ALTER DATABASE [Instagram] SET  READ_WRITE 
GO
