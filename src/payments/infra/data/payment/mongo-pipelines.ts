import { PipelineStage } from 'mongoose';
import { PaymentDocument } from './payment.doc';

export const onePayment = (
  match: Partial<PaymentDocument>,
): PipelineStage[] => [
  {
    $match: match,
  },
  {
    $lookup: {
      from: 'payments_store',
      localField: '_id',
      foreignField: 'pid',
      pipeline: [
        {
          $sort: { timestamp: 1 },
        },
        {
          $group: {
            _id: '$pid',
            paymentObject: {
              $mergeObjects: '$data',
            },
            updatedAt: {
              $last: '$timestamp',
            },
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [
                {
                  id: '$_id',
                },
                '$paymentObject',
                {
                  updatedAt: '$updatedAt',
                },
              ],
            },
          },
        },
        {
          $project: {
            policyId: 0,
            orderId: 0,
          },
        },
      ],
      as: 'data',
    },
  },
  {
    $replaceRoot: {
      newRoot: {
        $mergeObjects: [
          {
            id: '$_id',
            recipientId: '$recipientId',
            policyId: '$policyId',
            orderId: '$orderId',
            providerId: '$providerId',
          },
          {
            $first: '$data',
          },
          {
            createdAt: '$createdAt',
            updatedAt: '$updatedAt',
          },
        ],
      },
    },
  },
  {
    $set: {
      id: {
        $toString: '$id',
      },
    },
  },
];

export const multiPayments = (
  match: Partial<PaymentDocument>,
  skip: number,
  limit: number,
): PipelineStage[] => [
  {
    $match: match,
  },
  {
    $sort: { createdAt: -1 },
  },
  { $skip: skip },
  { $limit: limit },
  {
    $lookup: {
      from: 'payments_store',
      localField: '_id',
      foreignField: 'pid',
      pipeline: [
        {
          $sort: { timestamp: 1 },
        },
        {
          $group: {
            _id: '$pid',
            paymentObject: {
              $mergeObjects: '$data',
            },
            updatedAt: {
              $last: '$timestamp',
            },
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [
                {
                  id: '$_id',
                },
                '$paymentObject',
                {
                  updatedAt: '$updatedAt',
                },
              ],
            },
          },
        },
        {
          $project: {
            policyId: 0,
            orderId: 0,
          },
        },
      ],
      as: 'data',
    },
  },
  {
    $replaceRoot: {
      newRoot: {
        $mergeObjects: [
          {
            id: '$_id',
            recipientId: '$recipientId',
            policyId: '$policyId',
            orderId: '$orderId',
            providerId: '$providerId',
          },
          {
            $first: '$data',
          },
          {
            createdAt: '$createdAt',
            updatedAt: '$updatedAt',
          },
        ],
      },
    },
  },
  {
    $set: {
      id: {
        $toString: '$id',
      },
    },
  },
];
