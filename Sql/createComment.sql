create procedure createComment
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

