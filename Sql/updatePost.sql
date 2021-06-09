create procedure updatePost
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