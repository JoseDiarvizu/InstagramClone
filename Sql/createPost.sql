create procedure createPost
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