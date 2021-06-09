create procedure deletePost
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