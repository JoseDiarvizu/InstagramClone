create procedure updateComment
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