create proc elad_add_movie
	@title nvarchar(250),
	@genre nvarchar(100),
	@director nvarchar(250),
	@publishedDate datetime,
	@poster text,
	@uploadBy int,
	@id int output
as
	insert into [dbo].[Movies]([title], [genre], [director], [publishedDate], [poster], [uploadBy])
		values(@title, @genre, @director, @publishedDate, @poster, @uploadBy)
		set @id = @@IDENTITY
go


-- run add proc
exec elad_add_movie 'Dancing Midgets Revolution 3', 'drama', 'Elad Or', '2000-10-05','the poster is too sexy', 2, 1
go

-- update movie
create proc elad_update_movie
	@title nvarchar(250),
	@genre nvarchar(100),
	@director nvarchar(250),
	@publishedDate datetime,
	@poster text,
	@uploadBy int,
	@id int
as
	update [dbo].[Movies]
		set [title] = @title,
			[director] = @director,
			[genre] = @genre,
			[publishedDate] = @publishedDate,
			[uploadBy] = @uploadBy,
			[poster] = @poster
		where [id] = @id
go

--proccess for deleting movies
create proc elad_delete_movie
	@id int
as
	delete from [dbo].[Movies] where [id] = @id
go

exec elad_delete_movie 1075
go

create proc elad_select_movie_by_id
	@id int
as
	select * from [dbo].[Movies] where [id] = @id
go

exec elad_select_movie_by_id 1076
go
