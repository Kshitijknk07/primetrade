import { DataTypes, Model, Optional } from 'sequelize';
import db from '../config/database';
import Task from './Task';
import User from './User';

interface CommentAttributes {
  id: string;
  content: string;
  taskId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CommentCreationAttributes extends Optional<CommentAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
  declare id: string;
  declare content: string;
  declare taskId: string;
  declare userId: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    taskId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Task,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: db,
    tableName: 'comments',
    timestamps: true,
    indexes: [{ fields: ['taskId'] }, { fields: ['userId'] }],
  }
);

Comment.belongsTo(User, { foreignKey: 'userId', as: 'author' });
Comment.belongsTo(Task, { foreignKey: 'taskId', as: 'task' });
Task.hasMany(Comment, { foreignKey: 'taskId', as: 'comments' });

export default Comment;
