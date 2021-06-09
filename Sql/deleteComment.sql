create procedure deleteComment
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

