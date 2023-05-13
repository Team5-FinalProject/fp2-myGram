const { Comment, User, Photo } = require("../models");

class CommentController {
  static async createComment(req, res) {
    try {
      const { comment, PhotoId } = req.body;
      const user = res.locals.user;

      const newComment = await Comment.create({
        comment,
        UserId: user.id,
        PhotoId,
      });

      res.status(201).json({
        comment: {
          id: newComment.id,
          comment: newComment.comment,
          UserId: newComment.UserId,
          PhotoId: newComment.PhotoId,
          updatedAt: newComment.updatedAt,
          createdAt: newComment.createdAt,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  static async getAllComments(req, res) {
    try {
      const comments = await Comment.findAll({
        where: {
          UserId: res.locals.user.id,
        },
        include: [
          {
            model: Photo,
            attributes: ["id", "title", "caption", "poster_image_url"],
          },
          {
            model: User,
            attributes: ["id", "username", "profile_image_url", "phone_number"],
          },
        ],
      });

      res.status(200).json({
        Comments: comments,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  static async updateCommentById(req, res) {
    try {
      const commentId = req.params.id;
      const { comment } = req.body;

      const updatedComment = await Comment.findByPk(commentId);

      if (!updatedComment) {
        return res.status(404).json({
          name: "Not Found",
          devMessage: `Comment with id ${commentId} not found`,
        });
      }

      const photoId = updatedComment.PhotoId;

      updatedComment.comment = comment;

      await updatedComment.save();

      res.status(200).json({
        comment: {
          id: updatedComment.id,
          comment: updatedComment.comment,
          UserId: updatedComment.UserId,
          PhotoId: photoId,
          updatedAt: updatedComment.updatedAt,
          createdAt: updatedComment.createdAt,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  static async deleteCommentById(req, res) {
    try {
      const commentId = req.params.id;
      const deletedComment = await Comment.destroy({
        where: { id: commentId },
      });

      if (deletedComment) {
        return res.status(200).json({
          message: "Your comment has been successfully deleted",
        });
      } else {
        return res.status(404).json({
          message: `Comment with id ${commentId} not found`,
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
}

module.exports = CommentController;
